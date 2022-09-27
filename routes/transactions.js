const express = require("express");
const router = express.Router();

const { transfer } = require("../controllers/transfer");
const {
  makeCardDeposit,
  verifyWebhook,
  withdrawal,
  userTransactions,
} = require("../controllers/transactions");

router.post("/transfer", transfer);

router.post("/deposit", makeCardDeposit);

router.post("/fs-webhook", verifyWebhook);

router.post("/withdraw", withdrawal);

router.get("/history/:id", userTransactions);

module.exports = router;
