const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const saleRoutes = require("./routes/saleRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/sales", saleRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log(`MongoDB connection error: ${err}`));
