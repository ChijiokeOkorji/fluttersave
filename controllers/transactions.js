const Transaction = require("../models/transaction");

// const Flutterwave = require("flutterwave-node-v3");

// const flw = new Flutterwave(
//   process.env.FLW_PUBLIC_KEY,
//   process.env.FLW_SECRET_KEY
// );

const mongoose = require("mongoose");
const { v4 } = require("uuid");
const { creditAccount, cardDeposit } = require("../utils/transactions");
const asyncWraper = require("../middleware/asyncWraper");

const makeCardDeposit = asyncWraper(async (req, res) => {
  try {
    const { fullname, mobileNumber, toEmail, depositAmount, summary } =
      req.body;
    const reference = v4();
    const currency = "NGN";
    if (!fullname && !mobileNumber && !depositAmount && !toEmail && !summary) {
      return res.status(400).json({
        status: false,
        message: "Please provide all input fields",
      });
    }

    const transferResult = await Promise.all([
      cardDeposit({
        mobileNumber,
        depositAmount,
        fullname,
        toEmail,
        reference,
      }),
    ]);

    const failedTxns = transferResult.filter(
      (result) => result.status !== "success"
    );
    if (failedTxns.length) {
      const errors = failedTxns.map((a) => a.message);
      return res.status(400).json({
        status: false,
        message: errors,
      });
    }

    console.log(transferResult[0].link);

    return res.status(201).json({
      status: true,
      message: "Deposit successful",
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
module.exports = { makeCardDeposit };
