const asyncWraper = require("../middleware/asyncWraper");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const register = asyncWraper(async (req, res) => {
  try {
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
      "User ID": newUser.id,
      "First Name": newUser.firstName,
      "Last Name": newUser.lastName,
      "Email": newUser.email,
      "Phone Number": newUser.phoneNumber,
    });
  } catch(err) {
    return res.status(500).json({
      status: false,
      message: `Unable to register user. Please try again.
      Error: ${err}`,
    });
  }
});

const login = asyncWraper(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (correctPassword) {
      return res.status(200).json({
        "User ID": user.id,
        "First Name": user.firstName,
        "Last Name": user.lastName,
        "Email": user.email,
        "Phone Number": user.phoneNumber,
      });
    } else {
      return res.status(400).json({ message: "Incorrect user credentials" });
    }
  } catch(err) {
    return res.status(500).json({
      status: false,
      message: `Unable to login. Please try again.
      Error: ${err}`,
    });
  }
});

const balance = asyncWraper(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    return res.status(200).json({
      Balance: parseFloat(user?.balance),
    });
  } catch(err) {
    return res.status(500).json({
      status: false,
      message: `Unable to get balance. Please try again.
      Error: ${err}`,
    });
  }
});

module.exports = {
  register,
  login,
  balance,
};
