const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import Routes
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));
app.use("/cart", require("./routes/cart"));

// ROUTES
app.get("/", (req, res) => {
  res.send("This is the index route!");
});

// Connect to DB
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => {
    console.error(err);
  });

// Listen to the server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
