const mongoose = require("mongoose");

let nominalSchema = mongoose.Schema(
  {
    coinName: {
      type: String,
      require: [true, "Coin name should be added"],
    },
    coinQuantity: {
      type: Number,
      require: [true, "Coin quantity should be added"],
    },
    price: {
      type: Number,
      require: [true, "Price should be added"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nominal", nominalSchema);
