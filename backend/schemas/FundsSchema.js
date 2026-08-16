const { Schema } = require("mongoose");

const FundsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    availableBalance: Number,
    usedMargin: Number,
    openingBalance: Number,
  },
  {
    timestamps: true
  }
);

module.exports = { FundsSchema };