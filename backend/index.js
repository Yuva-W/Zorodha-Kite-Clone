require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./models/HoldingsModel");
const { OrdersModel } = require("./models/OrdersModel");
const { PositionsModel } = require("./models/PositionsMode");
const { FundsModel } = require("./models/FundsModel");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");


const PORT = process.env.PORT || 3002;
const url = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.get("/allholdings", authMiddleware, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({
      userId: req.user.userId
    });

    res.json(allHoldings);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to fetch holdings"
    });
  }
});

app.get("/allPositions", authMiddleware, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({
      userId: req.user.userId,
    });

    res.json(allPositions);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch positions",
    });
  }
});

app.get("/allOrders", authMiddleware, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({
      userId: req.user.userId,
    });

    res.json(allOrders);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

app.post("/newOrder", authMiddleware, async (req, res) => {
  try {

    const { name, qty, price, mode } = req.body;

    const newOrder = new OrdersModel({
      userId: req.user.userId,
      name,
      qty,
      price,
      mode,
    });

    await newOrder.save();

    res.json({
      message: "Order is placed",
      order: newOrder,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Failed to place order",
    });
  }
});

app.post("/addFunds", authMiddleware, async (req, res) => {
  try {

    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0"
      });
    }

    const funds = await FundsModel.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $inc: {
          availableBalance: amount,
          openingBalance: amount,
        },
      },
      { new: true, upsert: true }
    );

    res.json({
      message: "Funds added successfully",
      funds,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Failed to add funds",
    });
  }
});

app.get("/funds", authMiddleware, async (req, res) => {
  try {

    const funds = await FundsModel.findOne({
      userId: req.user.userId,
    });

    if (!funds) {
      return res.json({
        availableBalance: 0,
        usedMargin: 0,
        openingBalance: 0,
      });
    }

    res.json(funds);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Failed to fetch funds",
    });
  }
});

app.listen(PORT, () => {
  console.log("App is started...! at", PORT);
  mongoose.connect(url);
  console.log("DB is Established");
  console.log("Mongodb url is :", url);
});
