const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Category name
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
