const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const HASH_ROUND = 10;

let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email should be exist"],
    },
    name: {
      type: String,
      require: [true, "Name should be exist"],
      maxLength: [255, "Panjang name harus 3 - 255 karakter"],
      minLength: [3, "Panjang name harus 3 - 255 karakter"],
    },
    username: {
      type: String,
      require: [true, "Name should be exist"],
      maxLength: [255, "Panjang name harus 3 - 255 karakter"],
      minLength: [3, "Panjang name harus 3 - 255 karakter"],
    },
    password: {
      type: String,
      require: [true, "Password should be exist"],
      maxLength: [255, "Panjang name harus 3 - 255 karakter"],
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
    avatar: {
      type: String,
    },
    filename: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      require: [true, "Phone number should be exist"],
      maxLength: [13, "Panjang nomor telephone harus 9 - 13 karakter"],
      minLength: [9, "Panjang nomor telephone harus 9 - 13 karakter"],
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

playerSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Player").countDocuments({ email: value });
      return !count;
    } catch (error) {
      throw error;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

playerSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = mongoose.model("Player", playerSchema);
