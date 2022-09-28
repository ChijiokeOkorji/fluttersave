const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const userSchema = new Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       index: true,
//       match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//     },
//     currency: {
//       type: String,
//       default: "NGN",
//       enum: ["NGN", "USD", "EUR", "GBP"],
//     },
//     totalBalance: {
//       type: mongoose.Decimal128,
//       required: true,
//       default: 0.0,
//     },
//     availableBalance: {
//       type: mongoose.Decimal128,
//       required: true,
//       default: 0.0,
//     },
//     userTransactions: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Transaction",
//       },
//     ],
//   },
//   { timestamps: true }
// );

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      default: "NGN",
      enum: ["NGN", "USD", "EUR", "GBP"],
    },
    balance: {
      type: mongoose.Decimal128,
      required: true,
      default: 0.0,
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
