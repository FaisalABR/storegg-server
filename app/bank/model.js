const mongoose = require("mongoose");

let bankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name should be exist"],
    },
    bankName: {
      type: String,
      require: [true, "Bank name should be exist"],
    },
    noRekening: {
      type: Number,
      require: [true, "Number account should be exist"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);
