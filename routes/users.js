const express = require("express");
const router = express.Router();

const { register, login, balance } = require("../controllers/users");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/balance").post(balance);

module.exports = router;
