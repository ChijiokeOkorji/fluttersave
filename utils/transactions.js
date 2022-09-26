const User = require("../models/user");
const Transaction = require("../models/transaction");

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

module.exports = {
  creditAccount,
  debitAccount,
};
