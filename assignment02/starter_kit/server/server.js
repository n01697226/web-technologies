const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recipeRoutes = require("recipes_router.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8001;
const MONGO_URI = process.env.MONGODB_URI;

// middleware and routes
app.use(cors());
app.use(express.json());
app.use("/recipe", recipeRoutes);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log(`MongoDB connection error: ${err}`));
