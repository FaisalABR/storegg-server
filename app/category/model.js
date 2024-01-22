const mongoose = require("mongoose");

let categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Category name should be added"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
