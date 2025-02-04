const User = require("../models/user");
const Transaction = require("../models/transaction");
const got = require("got");

const creditAccount = async ({
  amount,
  email,
  purpose,
  reference,
  trnxSummary,
  session,
}) => {
  existingUser = await User.findOne({ email });
  if (!existingUser) {
    return {
      status: false,
      statusCode: 404,
      message: `User ${email} doesn't exist`,
    };
  }

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $inc: { balance: amount } },
    { session }
  );

  const transaction = new Transaction({
    trnxType: "Credit",
    purpose,
    amount,
    userEmail: email,
    reference,
    balanceBefore: Number(existingUser.balance),
    balanceAfter: Number(existingUser.balance) + Number(amount),
    trnxSummary,
  });

  updatedUser.transactions.push(transaction);
  await transaction.save({ session });
  await updatedUser.save();

  return {
    status: true,
    statusCode: 201,
    message: "Credit successful",
    data: { updatedUser, transaction },
  };
};

const debitAccount = async ({
  amount,
  email,
  purpose,
  reference,
  trnxSummary,
  session,
}) => {
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return {
      status: false,
      statusCode: 404,
      message: `User ${email} doesn't exist`,
    };
  }

  if (Number(existingUser.balance) < Number(amount)) {
    return {
      status: false,
      statusCode: 400,
      message: `User ${email} has insufficient balance`,
    };
  }

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $inc: { balance: -amount } },
    { session }
  );

  const transaction = new Transaction({
    trnxType: "Debit",
    purpose,
    amount,
    userEmail: email,
    reference,
    balanceBefore: Number(existingUser.balance),
    balanceAfter: Number(existingUser.balance) - Number(amount),
    trnxSummary,
  });

  updatedUser.transactions.push(transaction);
  await transaction.save({ session });
  await updatedUser.save();

  return {
    status: true,
    statusCode: 201,
    message: "Debit successful",
    data: { updatedUser, transaction },
  };
};

const cardDeposit = async ({
  fullName,
  mobileNumber,
  depositAmount,
  toEmail,
  reference,
}) => {
  try {
    const response = await got
      .post("https://api.flutterwave.com/v3/payments", {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
        json: {
          tx_ref: reference,
          amount: depositAmount,
          currency: "NGN",
          payment_options: "card",
          redirect_url: "https://fluttersave.herokuapp.com/home",
          meta: {
            consumer_id: 23,
            consumer_mac: "92a3-912ba-1192a",
          },
          customer: {
            email: toEmail,
            phonenumber: mobileNumber,
            name: fullName,
          },
          customizations: {
            title: "Fluttersave",
            logo: "",
          },
        },
      })
      .json();

    return {
      status: response.status,
      message: response.message,
      link: response.data.link,
    };
  } catch (err) {
    console.log(err.code);
    console.log(err.response.body);
  }
};

const bankWithdrawal = async ({
  fromEmail,
  reference,
  amount,
  narration,
  accountNumber,
  bankCode,
}) => {
  try {
    const response = await got
      .post("https://api.flutterwave.com/v3/transfers", {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
        json: {
          account_bank: bankCode,
          account_number: accountNumber,
          amount,
          narration: narration,
          currency: "NGN",
          reference: reference,
          callback_url: "https://fluttersave.herokuapp.com/fluttersave/fs-webhook",
          debit_currency: "NGN",
          meta: {
            email: fromEmail,
          },
        },
      })
      .json();

    return { status: response.status, message: response.message };
  } catch (err) {
    console.log(err.code);
    console.log(err.response.body);
  }
};

module.exports = {
  creditAccount,
  debitAccount,
  cardDeposit,
  bankWithdrawal,
};
