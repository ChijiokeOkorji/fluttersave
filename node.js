require("dotenv").config();

const express = require("express");
const path = require("path");

const connectDB = require("./db/connect");
const userRoutes = require("./routes/users");
const transactionRoutes = require("./routes/transactions");
const bankRoutes = require("./routes/banks");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/fluttersave/", userRoutes);
app.use("/fluttersave/", transactionRoutes);
app.use("/fluttersave/", bankRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
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
