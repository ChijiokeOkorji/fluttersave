const express = require("express");
const router = express.Router();

const {
  getBanks,
  validateAccount
} = require("../controllers/banks");

router.get("/banks", getBanks);

router.post("/account-validate", validateAccount);

module.exports = router;
