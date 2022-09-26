const express = require("express");
const router = express.Router();

const { transfer } = require("../controllers/transfer");

router.post("/transfer", transfer);

module.exports = router;
