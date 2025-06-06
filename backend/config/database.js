const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URL;
const connectDatabase = () => {
  mongoose.connect(MONGO_URI, { dbName: "fashion_dev" }).then(() => {
    console.log("Mongoose Connected");
  });
};

module.exports = connectDatabase;
