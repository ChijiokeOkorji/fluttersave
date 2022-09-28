const User = require("../models/user");
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
    const { fullname, mobileNumber, toEmail, depositAmount } = req.body;
    const reference = v4();
    const currency = "NGN";
    if (!(fullname && mobileNumber && depositAmount && toEmail)) {
      return res.status(400).json({
        status: false,
        message: "Please provide all input fields",
      });
    }

    const depositResult = await Promise.all([
      cardDeposit({
        mobileNumber,
        depositAmount,
        fullname,
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

    // return res.redirect(depositResult[0].link);
    return res.status(200).json(depositResult);
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Unable to make card Deposit. Please try again. \n Error: ${err}`,
    });
  }
});

// verify transaction from the webhook and update the database
const verifyWebhook = asyncWraper(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const secretHash = process.env.FLW_SECRET_HASH;
    const signature = req.headers["verif-hash"];
    if (!signature || signature !== secretHash) {
      // This request isn't from Flutterwave; discard
      return res.status(401).end();
    }
    const payload = req.body;
    // It's a good idea to log all received events.
    console.log(payload);

    if (
      payload.data.status === "successful" &&
      payload.data.currency === "NGN"
      // &&
      // payload.event.type === "CARD_TRANSACTION"
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

      const failedTxns = transferResult.filter(
        (result) => result.status !== true
      );
      if (failedTxns.length) {
        const errors = failedTxns.map((a) => a.message);
        await session.abortTransaction();
        return res.status(400).json({
          status: false,
          message: errors,
        });
      }

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        status: true,
        message: "deposit successful",
      });
    }

    // if (
    //   payload.data.status === "SUCCESSFUL" &&
    //   payload.data.currency === "NGN" &&
    //   payload.event.type === "Transfer"
    // ) {
    //   // Success! Confirm the customer's payment
    //   const transferResult = await Promise.all([
    //     debitAccount({
    //       amount,
    //       email: payload.data.customer.email,
    //       purpose: "deposit",
    //       reference: payload.data.tx_ref,
    //       trnxSummary: `TRFR FROM: ${payload.data.customer.name}. TRNX REF:${payload.data.tx_ref} `,
    //       session,
    //     }),
    //   ]);

    //   const failedTxns = transferResult.filter(
    //     (result) => result.status !== true
    //   );
    //   if (failedTxns.length) {
    //     const errors = failedTxns.map((a) => a.message);
    //     return res.status(400).json({
    //       status: false,
    //       message: errors,
    //     });
    //   }

    //   return res.status(201).json({
    //     status: true,
    //     message: "Transfer successful",
    //   });
    // }
    return res.status(401).json({
      status: true,
      message: "Transfer failed",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      status: false,
      message: `Unable to perform transaction. Please try again. \n Error: ${err}`,
    });
  }
});

// make a withdral to the users bank account
const withdrawal = asyncWraper(async (req, res) => {
  try {
    const { fromEmail, amount, accountNumber, bankCode, summary } = req.body;
    const reference = "dfs23fhr7ntg0293039_PMCKDU_1";
    const currency = "NGN";
    if (!fromEmail && !amount && !accountNumber && !bankCode && !summary) {
      return res.status(400).json({
        status: false,
        message: "Please provide all input fields",
      });
    }

    const debitResult = await Promise.all([
      bankWithdrawal({
        reference,
        amount,
        summary,
        accountNumber,
        bankCode,
      }),
    ]);

    const failedTxns = debitResult.filter(
      (result) => result.status !== "success"
    );
    if (failedTxns.length) {
      const errors = failedTxns.map((a) => a.message);
      return res.status(400).json({
        status: false,
        message: errors,
      });
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

const userTransactions = asyncWraper(async (req, res) => {
  const user = await User.findById(req.params.id).populate({
    path: "transactions",
    select: "trnxType purpose amount reference trnxSummary createdAt",
  });
  res.status(201).json(user.transactions);
});

module.exports = {
  makeCardDeposit,
  verifyWebhook,
  withdrawal,
  userTransactions,
};

// else {
//   return res.status(401).json({
//     status: true,
//     message: "Transfer failed",
//   }); // Inform the customer their payment was unsuccessful
// }
