require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/orders", orderRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Order Service running on port ${process.env.PORT}`)
);
