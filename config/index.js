const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

module.exports = {
  rootPath: path.resolve(__dirname, ".."),
  jwtKey: process.env.SECRET,
  serviceName: process.env.SERVICE_NAME,
  urlDb: process.env.MONGO_URL,
};

console.log(path.resolve(__dirname, ".."));
