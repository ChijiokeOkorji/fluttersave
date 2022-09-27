const Transaction = require("../models/transaction");
const mongoose = require("mongoose");
const { v4 } = require("uuid");
const { creditAccount, debitAccount } = require("../utils/transactions");
const asyncWraper = require("../middleware/asyncWraper");

const transfer = asyncWraper(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { toEmail, fromEmail, amount } = req.body;
    const reference = v4();
    if (!toEmail && !fromEmail && !amount) {
      return res.status(400).json({
        status: false,
        message:
          "Please provide the following details: toEmail, fromEmail, amount, summary",
      });
    }

    const transferResult = await Promise.all([
      debitAccount({
        amount,
        email: fromEmail,
        purpose: "P2P",
        reference,
        trnxSummary: `TRFR TO: ${toEmail}. TRNX REF:${reference}`,
        session,
      }),
      creditAccount({
        amount,
        email: toEmail,
        purpose: "P2P",
        reference,
        trnxSummary: `TRFR FROM: ${fromEmail}. TRNX REF:${reference} `,
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
      message: "Transfer successful",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      status: false,
      message: `Unable to perform transfer. Please try again. \n Error: ${err}`,
    });
  }
});

module.exports = { transfer };
