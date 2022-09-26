const User = require("../models/user");
const Transaction = require("../models/transaction");
const got = require("got");
// const Flutterwave = require("flutterwave-node-v3");

// const flw = new Flutterwave(
//   process.env.FLW_PUBLIC_KEY,
//   process.env.FLW_SECRET_KEY
// );

const creditAccount = async ({
  amount,
  email,
  purpose,
  reference,
  summary,
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
    { $inc: { totalBalance: amount } },
    { session }
  );

  const transaction = new Transaction({
    trnxType: "CR",
    purpose,
    amount,
    userEmail: email,
    reference,
    balanceBefore: Number(existingUser.totalBalance),
    balanceAfter: Number(existingUser.totalBalance) + Number(amount),
    summary,
    trnxSummary,
  });

  updatedUser.userTransactions.push(transaction);
  await transaction.save({ session });
  await updatedUser.save();

  // console.log(transaction);

  console.log(`Credit successful`);
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
  summary,
  trnxSummary,
  session,
}) => {
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return {
      status: false,
      statusCode: 404,
      message: `User ${email} doesn\'t exist`,
    };
  }

  if (Number(existingUser.totalBalance) < amount) {
    return {
      status: false,
      statusCode: 400,
      message: `User ${email} has insufficient balance`,
    };
  }

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $inc: { totalBalance: -amount } },
    { session }
  );
  const transaction = new Transaction({
    trnxType: "DR",
    purpose,
    amount,
    userEmail: email,
    reference,
    balanceBefore: Number(existingUser.totalBalance),
    balanceAfter: Number(existingUser.totalBalance) - Number(amount),
    summary,
    trnxSummary,
  });

  updatedUser.userTransactions.push(transaction);
  await transaction.save({ session });
  await updatedUser.save();

  console.log(`Debit successful`);
  return {
    status: true,
    statusCode: 201,
    message: "Debit successful",
    data: { updatedUser, transaction },
  };
};

// const cardDeposit = async ({
//   card_number,
//   cvv,
//   expiry_month,
//   expiry_year,
//   currency,
//   amount,
//   fullname,
//   email,
//   tx_ref,
// }) => {
//   const deposit = await flw.Charge.card(
//     card_number,
//     cvv,
//     expiry_month,
//     expiry_year,
//     currency,
//     amount,
//     fullname,
//     email,
//     tx_ref
//   );

//   console.log("Deposit successful");
//   return {
//     status: true,
//     statusCode: 201,
//     message: "Deposit successful",
//     data: { deposit },
//   };
// };

const cardDeposit = async ({
  reference,
  depositAmount,
  toEmail,
  mobileNumber,
  fullname,
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
          redirect_url: "http://localhost:8080/fluttersave/verify-deposit",
          meta: {
            consumer_id: 23,
            consumer_mac: "92a3-912ba-1192a",
          },
          customer: {
            email: toEmail,
            phonenumber: mobileNumber,
            name: fullname,
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
      link: response.data.link,
    };
  } catch (err) {
    console.log(err.code);
    console.log(err.response.body);
  }
};

module.exports = {
  creditAccount,
  debitAccount,
  cardDeposit,
};
