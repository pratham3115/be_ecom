const express = require("express");
const multer = require("multer");
const Product = require("../models/product");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Fetch products by category or all products
router.get("/", async (req, res) => {
  try {
    const categoryId = req.query.category;
    const query = categoryId ? { category: categoryId } : {}; // Filter by category if provided
    const products = await Product.find(query).populate("category");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new product with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const productData = req.body;
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }
    const product = new Product(productData);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update product details
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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

module.exports = router;
