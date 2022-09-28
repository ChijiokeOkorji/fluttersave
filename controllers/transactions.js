const Transaction = require("../models/transaction");

// const Flutterwave = require("flutterwave-node-v3");

// const flw = new Flutterwave(
//   process.env.FLW_PUBLIC_KEY,
//   process.env.FLW_SECRET_KEY
// );

const mongoose = require("mongoose");
const { v4 } = require("uuid");
const {
  creditAccount,
  debitAccount,
  cardDeposit,
  bankWithdrawal,
} = require("../utils/transactions");
const asyncWraper = require("../middleware/asyncWraper");

// Card deposit controller
const makeCardDeposit = asyncWraper(async (req, res) => {
  try {
    const { fullName, mobileNumber, toEmail, depositAmount } = req.body;

    if (!fullName || !mobileNumber || !depositAmount || !toEmail) {
      return res.status(400).json({
        status: false,
        message: "Please provide all input fields",
      });
    }

    const reference = v4();

    const depositResult = await Promise.all([
      cardDeposit({
        fullName,
        mobileNumber,
        depositAmount,
        toEmail,
        reference,
      }),
    ]);

    const failedTxns = depositResult.filter(
      (result) => result.status !== "success"
    );

    if (failedTxns.length) {
      const errors = failedTxns.map((a) => a.message);

      return res.status(400).json({
        status: false,
        message: errors,
      });
    }

    return res.redirect(depositResult[0].link);

    // return res.status(201).json({
    //   status: true,
    //   message: "Authorized",
    // });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Unable to make card Deposit. Please try again. \n Error: ${err}`,
    });
  }
});

// verify transaction from the webhook and update the database
const verifyWebhook = asyncWraper(async (req, res) => {
  try {
    const secretHash = process.env.FLW_SECRET_HASH;
    const signature = req.headers["verif-hash"];

    if (!signature || signature !== secretHash) {
      // This request isn't from Flutterwave; discard
      return res.status(401).end();
    }

    const payload = req.body;
    // It's a good idea to log all received events.

    if (
      payload.data.status === "successful" &&
      response.data.currency === "NGN"
    ) {
      // Success! Confirm the customer's payment
      const transferResult = await Promise.all([
        creditAccount({
          amount,
          email: payload.data.customer.email,
          purpose: "deposit",
          reference: payload.data.tx_ref,
          trnxSummary: `TRFR FROM: ${payload.data.customer.name}. TRNX REF:${payload.data.tx_ref} `,
          session,
        }),
      ]);

      console.log(transferResult);

      const failedTxns = transferResult.filter(
        (result) => result.status !== true
      );
      if (failedTxns.length) {
        const errors = failedTxns.map((a) => a.message);
        return res.status(400).json({
          status: false,
          message: errors,
        });
      }

      console.log(transferResult);
      return res.status(201).json({
        status: true,
        message: payload.event,
      });
    } else {
      return res.status(401).json({
        status: true,
        message: "Transfer failed",
      }); // Inform the customer their payment was unsuccessful
    }

    return res.status(200).json({
      status: debitResult.status,
      message: debitResult.message,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Unable to make card Deposit. Please try again. \n Error: ${err}`,
    });
  }
});

// const bankWithdrawal = asyncWraper(async () => {
//   const { fromEmail, amount, summary } = req.body;
// });
module.exports = { makeCardDeposit, verifyWebhook };
