const express = require("express");
const router = express.Router();

const {
  register,
  login,
  balance
} = require("../controllers/users");

router.post("/register", register);

router.post("/login", login);

router.get("/balance/:id", balance);

module.exports = router;
