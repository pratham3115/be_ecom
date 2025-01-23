const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes'); // Assuming you have product routes
const categoryRoutes = require('./routes/categoryRoutes');  // Import category routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  // Routes
app.use("/api/products", productRoutes);  // Handle product routes
app.use("/api/categories", categoryRoutes); // Handle category routes

// Root Route
app.get('/', (req, res) => {
  res.send('Server is running and MongoDB is connected!');
});


// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});