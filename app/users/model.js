const mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email should be exist"],
    },
    name: {
      type: String,
      require: [true, "Name should be exist"],
    },
    password: {
      type: String,
      require: [true, "Password should be exist"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    phoneNumber: {
      type: Number,
      require: [true, "Phone number should be exist"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
