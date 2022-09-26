const express = require("express");
const router = express.Router();

const { transfer } = require("../controllers/transfer");
const { makeCardDeposit } = require("../controllers/transactions");

router.post("/transfer", transfer);

router.post("/deposit", makeCardDeposit);

module.exports = router;
