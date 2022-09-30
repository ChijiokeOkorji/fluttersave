const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    trnxType: {
      type: String,
      required: true,
      enum: ["CR", "DR"],
    },
    purpose: {
      type: String,
      enum: ["Deposit", "Transfer", "Withdrawal"],
      required: true,
    },
    amount: {
      type: mongoose.Decimal128,
      required: true,
      default: 0.0,
    },
    userEmail: {
      type: String,
      ref: "User",
    },
    reference: {
      type: String,
      required: true,
    },
    balanceBefore: {
      type: mongoose.Decimal128,
      required: true,
    },
    balanceAfter: {
      type: mongoose.Decimal128,
      required: true,
    },
    trnxSummary: {
      type: String,
      required: true,
    },
    trnxNarration: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    bankName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
