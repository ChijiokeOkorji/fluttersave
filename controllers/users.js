const asyncWraper = require("../middleware/asyncWraper");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const register = asyncWraper(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  if (!(firstName && lastName && email && phoneNumber && password)) {
    return res.status(400).json({ message: "All input is required" });
  }

  const registeredUser = await User.findOne({ email });

  if (registeredUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    phoneNumber,
    password: hashedPassword,
  });

  // const userWallet = await Wallet.create({
  //   firstName,
  //   lastName,
  //   email: email.toLowerCase(),
  //   phoneNumber,
  //   userId: newUser._id,
  // });

  res.status(200).json({ msg: "User successfully created" });
});

const renderLogin = (req, res) => {
  res.send("login form");
};

const login = asyncWraper(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const correctPassword = await bcrypt.compare(password, user.password);

  if (correctPassword) {
    res.status(400).json({ msg: "successfully logged in" });
  } else {
    return res.status(400).json({ message: "Incorrect user credentials" });
  }
});

const logout = (req, res) => {
  res.send("logout successful");
};

module.exports = {
  register,
  login,
  logout,
};
