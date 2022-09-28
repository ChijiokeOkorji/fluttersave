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

  return res.status(200).json({
    "First Name": newUser.firstName,
    "Last Name": newUser.lastName,
    "Email": newUser.email,
    "Phone Number": newUser.phoneNumber,
  });
});

const login = asyncWraper(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const correctPassword = await bcrypt.compare(password, user.password);

  if (correctPassword) {
    return res.status(200).json({
      "First Name": user.firstName,
      "Last Name": user.lastName,
      "Email": user.email,
      "Phone Number": user.phoneNumber
    });
  } else {
    return res.status(400).json({ message: "Incorrect user credentials" });
  }
});

const balance = asyncWraper(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  return res.status(200).json({
    "Balance": parseFloat(user?.balance)
  });
});

module.exports = {
  register,
  login,
  balance
};
