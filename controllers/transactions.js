const User = require("../models/user");
const mongoose = require("mongoose");
const Transaction = require("../models/transaction");
const { v4 } = require("uuid");
const {
  creditAccount,
  debitAccount,
  cardDeposit,
  bankWithdrawal,
  fundAccount,
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
    return res.status(200).json(depositResult[0]);
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
      return res.status(401).end();
    }
    const payload = req.body;
    // It's a good idea to log all received events.
    console.log(payload);

    const csEmail = payload.data.customer.email;
    const debEmail = payload.data.meta.email;
    const debtxReference = payload.data.reference;
    const debAccountNum = payload.data.account_number;
    const userName = payload.data.customer.name;
    const txAmount = payload.data.amount;
    const txReference = payload.data.tx_ref;

    // for collection webhook
    if (
      payload.data.status === "successful" &&
      payload.data.currency === "NGN"
    ) {
      console.log("wallet:", csEmail);

      const userWallet = await User.findOne({ email: csEmail });

      if (!userWallet) {
        return {
          status: false,
          statusCode: 404,
          message: `User ${csEmail} doesn't exist`,
        };
      }
      console.log(userWallet);
      const updatedUser = await User.findOneAndUpdate(
        { email: csEmail },
        { $inc: { balance: txAmount } }
      );

      const transaction = new Transaction({
        trnxType: "CR",
        purpose: "deposit",
        amount: txAmount,
        userEmail: csEmail,
        reference: txReference,
        balanceBefore: Number(userWallet.balance),
        balanceAfter: Number(userWallet.balance) + Number(txAmount),
        trnxSummary: `TRFR FROM: ${userName}. TRNX REF:${txReference}`,
      });

      updatedUser.transactions.push(transaction);
      await transaction.save();
      await updatedUser.save();

      console.log(transaction);

      console.log(`Credit successful`);

      return res.status(201).json({
        status: true,
        message: "deposit successful",
      });
    }

    if (
      payload.data.status === "SUCCESSFUL" &&
      payload.data.currency === "NGN"
    ) {
      const existingUser = await User.findOne({ email: debEmail });
      if (!existingUser) {
        return {
          status: false,
          statusCode: 404,
          message: `User ${debEmail} doesn\'t exist`,
        };
      }

      if (Number(existingUser.balance) < Number(txAmount)) {
        return {
          status: false,
          statusCode: 400,
          message: `User ${debEmail} has insufficient balance`,
        };
      }

      const updatedUser = await User.findOneAndUpdate(
        { email: debEmail },
        { $inc: { balance: -txAmount } }
      );
      const transaction = new Transaction({
        trnxType: "DR",
        purpose: "withdrawal",
        amount: txAmount,
        userEmail: debEmail,
        reference: debtxReference,
        balanceBefore: Number(existingUser.balance),
        balanceAfter: Number(existingUser.balance) - Number(txAmount),
        trnxSummary: `TRFR TO: ${debAccountNum}. TRNX REF:${debtxReference}`,
      });

      updatedUser.transactions.push(transaction);
      await transaction.save();
      await updatedUser.save();

      console.log(`Debit successful`);
      // return {
      //   status: true,
      //   statusCode: 201,
      //   message: "withdrawal successful",
      //   data: { updatedUser, transaction },
      // };

      return res.status(201).json({
        status: true,
        message: "withdrawal successful",
      });
    }
    return res.status(401).json({
      status: true,
      message: "Transfer failed",
    });
  } catch (err) {
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
    const reference = "dfs23fhr7ntg0293045_PMCKDU_1";
    const currency = "NGN";
    if (!(fromEmail && amount && accountNumber && bankCode && summary)) {
      return res.status(400).json({
        status: false,
        message: "Please provide all input fields",
      });
    }

    const debitResult = await Promise.all([
      bankWithdrawal({
        fromEmail,
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

    return res.status(200).json(debitResult[0]);
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Unable to make withdrawal. Please try again. \n Error: ${err}`,
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
