const User = require("../models/user");
const Transaction = require("../models/transaction");
const got = require("got");
// const axios = require('axios');
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
    trnxType: "CR",
    purpose,
    amount,
    userEmail: email,
    reference,
    balanceBefore: Number(existingUser.balance),
    balanceAfter: Number(existingUser.balance) + Number(amount),
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

  if (Number(existingUser.balance) < amount) {
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
    trnxType: "DR",
    purpose,
    amount,
    userEmail: email,
    reference,
    balanceBefore: Number(existingUser.balance),
    balanceAfter: Number(existingUser.balance) - Number(amount),
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
//   fullName,
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
//     fullName,
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
  fullName,
  mobileNumber,
  depositAmount,
  toEmail,
  reference
}) => {
  try {
    // const response = await axios.post("https://api.flutterwave.com/v3/payments", {
    //   tx_ref: reference,
    //   amount: depositAmount,
    //   currency: "NGN",
    //   redirect_url: "http://localhost:8080/fluttersave/verify-deposit",
    //   meta: {
    //     consumer_id: 23,
    //     consumer_mac: "92a3-912ba-1192a"
    //   },
    //   customer: {
    //     email: toEmail,
    //     phone_number: mobileNumber,
    //     name: fullName
    //   },
    //   customizations: {
    //     title: "Fluttersave",
    //     logo: ""
    //   }
    // }, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
    //   }
    // });

    // return response.data.data.link;

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
