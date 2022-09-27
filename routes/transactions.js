const express = require("express");
const router = express.Router();

const { transfer } = require("../controllers/transfer");
const {
  makeCardDeposit,
  verifyWebhook,
} = require("../controllers/transactions");

router.post("/transfer", transfer);

router.post("/deposit", makeCardDeposit);

router.post("/fs-webhook", verifyWebhook);

module.exports = router;
