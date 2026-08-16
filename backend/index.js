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
      userId: req.user.userId
    });

    res.json(allPositions);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to fetch positions"
    });
  }
});

app.get("/allOrders", authMiddleware, async (req, res) => {
  try {
    let allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch orders" });
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

    res.status(201).json({
      message: "Order is placed",
      order: newOrder,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to place order",
    });
  }
});

app.get("/funds", authMiddleware, async (req, res) => {
  try {
    const funds = await FundsModel.findOne({
      userId: req.user.userId
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
      error: "Failed to fetch funds",
    });
  }
});



app.listen(PORT, () => {
  console.log("App is started...! at", PORT);
  mongoose.connect(url);
  console.log("DB is Established");
  console.log("Mongodb url is :", url);
});
