const asyncWraper = require("../middleware/asyncWraper");
const axios = require("axios");

const BASE_URL = 'https://api.flutterwave.com/v3';

const getBanks = asyncWraper(async (req, res) => {
  try {
    const getAllBanks = await axios.get(`${BASE_URL}/banks/NG`, {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
      }
    });
    
    getAllBanks.data.data.sort((a, b) => {
      let item1 = a.name.toLowerCase();
      let item2 = b.name.toLowerCase();
    
      if (item1 < item2) return -1;
      if (item1 > item2) return 1;
    
      return 0;
    });

    return res.status(200).json(getAllBanks.data);
  } catch(err) {
    return res.status(500).json({
      status: false,
      message: `Unable to get banks. Please try again.
      Error: ${err}`,
    });
  }
});

const validateAccount = asyncWraper(async (req, res) => {
  try {
    const { accountNumber, accountBank } = req.body;

    const validAccountName = await axios.post(`${BASE_URL}/accounts/resolve`, {
      account_number: accountNumber,
      account_bank: accountBank
    }, {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
      }
    });

    return res.status(200).json(validAccountName.data.data);
  } catch(err) {
    return res.status(500).json({
      status: false,
      message: `Unable to get banks. Please try again.
      Error: ${err}`,
    });
  }
});

module.exports = {
  getBanks,
  validateAccount
};
