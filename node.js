require("dotenv").config();

const express = require("express");
const path = require("path");

const connectDB = require("./db/connect");
const userRoutes = require("./routes/users");
const transactionRoutes = require("./routes/transactions");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/fluttersave/", userRoutes);
app.use("/fluttersave/", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Home page");
});

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    connectDB(process.env.MONGO_URL);

    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

// const BASE_URL = 'https://api.flutterwave.com/v3';

// // app.get("/server", async (req, res) => {
// //   try {
// //     // GO TO CARD PAYMENT MODAL LOGIC
// //     const goToCardPayment = await axios.post(`${BASE_URL}/payments`, {
// //       tx_ref: "PAY_REF-1234kjdfbnkdbuidiufvv",
// //       amount: "100",
// //       currency: "NGN",
// //       redirect_url: "https://webhook.site/9708dce8-3622-41a4-8208-2785bebae83c",
// //       meta: {
// //         consumer_id: 23,
// //         consumer_mac: "92a3-912ba-1192a"
// //       },
// //       customer: {
// //         email: "rose@unsinkableship.com",
// //         phone_number: "08102909304",
// //         name: "Rose DeWitt Bukater"
// //       },
// //       customizations: {
// //         title: "Pied Piper Payments",
// //         logo: ""
// //       }
// //     }, {
// //       headers: {
// //         Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
// //       }
// //     });

// //     // GET ALL BANKS LOGIC
// //     const getAllBanks = await axios.get(`${BASE_URL}/banks/NG`, {
// //       headers: {
// //         Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
// //       }
// //     });

// //     // VALIDATE ACCOUNT LOGIC
// //     const validateAccount = await axios.post(`${BASE_URL}/accounts/resolve`, {
// //       account_number: "0690000032",
// //       account_bank: "044"
// //     }, {
// //       headers: {
// //         Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
// //       }
// //     });

// //     res.send(goToCardPayment.data);
// //     // res.send(getAllBanks.data);
// //     // res.send(validateAccount.data);
// //   } catch(err) {
// //     console.log(err.code);
// //     console.log(err.response.data);
// //   }
// // });
