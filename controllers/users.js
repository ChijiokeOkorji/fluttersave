const asyncWraper = require("../middleware/asyncWraper");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const register = asyncWraper(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  if (!(firstName && lastName && email && phoneNumber && password)) {
    return res.status(400).json({ msg: "All input is required" });
  }

  const registeredUser = await User.findOne({ email });

  if (registeredUser) {
    return res.status(400).json({ msg: "User already exist" });
  }

  hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    phoneNumber,
    password: hashedPassword,
  });

  res.status(200).json({ msg: "User successfully created" });
});

const login = asyncWraper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "User does not exist" });
  }

  const correctPassword = await bcrypt.compare(password, user.password);

  if (correctPassword) {
    res.status(201).json({ msg: "successfully logged in" });
  } else {
    res.status(400).json({ msg: "incorrect user credentials" });
  }
});

module.exports = {
  register,
  login,
};
