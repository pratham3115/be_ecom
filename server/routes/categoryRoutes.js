const express = require("express")
const Category = require("../models/category")
const multer = require("multer")
const path = require("path")

const router = express.Router()

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/") // Define upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false)
    }
    cb(null, true)
  },
})

// Fetch all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

// Create a new category
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file && !req.body.imageUrl) {
      return res.status(400).json({ message: "Image is required" })
    }

    const category = new Category({
      name: req.body.name,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl,
    })

    const newCategory = await category.save()
    res.status(201).json(newCategory)
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: err.message })
  }
})

// Delete a category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }
    res.json({ message: "Category deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

module.exports = router

