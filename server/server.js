const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Built-in middleware for JSON parsing
app.use("/uploads", express.static("uploads")); // Serve uploaded images statically

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Server is running and MongoDB is connected!");
});

// Start server
const PORT = process.env.PORT || 5000; // Use environment port or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
