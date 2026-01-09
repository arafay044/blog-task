const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

// Routes
app.use("/auth", require("../routes/authRoutes"));
app.use("/posts", require("../routes/postRoutes"));

// MongoDB (serverless-safe)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Error:", err);
  }
}

connectDB();

// ✅ COMMONJS EXPORT (REQUIRED)
module.exports = app;
