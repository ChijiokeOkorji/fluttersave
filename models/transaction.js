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
      enum: ["card deposit", "P2P", "bank withdrawal"],
      required: true,
    },
    amount: {
      type: mongoose.Decimal128,
      required: true,
      default: 0.0,
    },
    startLockDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endLockDate: {
      type: Date,
      required: true,
      default: Date.now,
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
    summary: {
      type: String,
      required: true,
    },
    trnxSummary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
