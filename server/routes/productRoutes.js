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
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
});

// Add a new product with image upload or URL
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file && !req.body.imageUrl) {
      return res.status(400).json({ message: "Image is required (file or URL)" });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

    const productData = {
      name: req.body.name,
      price: Number.parseFloat(req.body.price),
      description: req.body.description,
      inStock: req.body.inStock === "true",
      category: req.body.category,
      image: imageUrl,
    };

    const product = new Product(productData);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Something broke!" });
  }
});

module.exports = router;