const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("User DB connected"))
  .catch((err) => console.error(err));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.listen(process.env.PORT, () => {
  console.log(`User Service running on port ${process.env.PORT}`);
});
