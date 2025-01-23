const express = require("express");
const multer = require("multer");
const Product = require("../models/product"); // Import the product model
const router = express.Router();

// Fetch products by category
router.get("/", async (req, res) => {
  try {
    const categoryId = req.query.category; // Get category ID from query params
    const products = await Product.find({ category: categoryId }); // Find products by category
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new product
router.post("/", async (req, res) => {
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update product details (e.g., inStock status)
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save uploaded files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file with a timestamp
  },
});

const upload = multer({ storage });

// Add a new product with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const productData = req.body;
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`; // Save image path
    }
    const product = new Product(productData);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
