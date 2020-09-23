const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoute = require("./routes/api/auth");
const itemRoute = require("./routes/api/items");

//Load configurations
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

//Bodyparser middlewares
app.use(express.json());

//Route middlewares
app.use("/api/user", authRoute);
app.use("/api/items", itemRoute);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
