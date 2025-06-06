const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middlewares/error");
var cors = require("cors");
const { StreamChat } = require("stream-chat");

const app = express();
app.use(cors());

// config
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config({ path: 'backend/config/config.env' });
// }
require("dotenv").config({ path: "config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("/api/v1/chat_token", async (req, res) => {
    const serverClient = StreamChat.getInstance(
      "xxyvqq925edc",
      "fk2z8wp6kxnhd4fnafd5mqp7rcn6nztr9ub8j9fv8qhsrz6vnrm8qv3c5qzgpmw2"
    );
    const userId = "user_" + Math.floor(Math.random() * 100000);
    await serverClient.upsertUser({
      id: userId,
      role: "user",
    });
    const token = await serverClient.createToken(userId);
    res.send({ user_id: userId, user_token: token });
  });
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/api/v1/chat_token", async (req, res) => {
    const serverClient = StreamChat.getInstance(
      "xxyvqq925edc",
      "fk2z8wp6kxnhd4fnafd5mqp7rcn6nztr9ub8j9fv8qhsrz6vnrm8qv3c5qzgpmw2"
    );
    const userId = "user_" + Math.floor(Math.random() * 100000);
    const userData = await serverClient.upsertUser({
      id: userId,
      role: "admin",
    });
    const token = await serverClient.createToken(userId);
    res.send({ user_id: userId, user_token: token });
  });
  app.get("/", (req, res) => {
    res.send("Server is Running! 🚀");
  });
}

// error middlewares
app.use(errorMiddleware);

module.exports = app;
