const express = require("express");
const router = express.Router();

const {
  renderRegister,
  register,
  renderLogin,
  login,
  logout,
} = require("../controllers/users");

router.route("/register").get(renderRegister).post(register);

router.route("/login").get(renderLogin).post(login);

router.get("/logout", logout);

module.exports = router;
