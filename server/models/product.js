const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },  // Product name
    price: { type: Number, required: true }, // Product price
    description: { type: String, required: true }, // Product description
    image: { type: String, required: true }, // Image URL for the product
    inStock: { type: Boolean, required: true }, // Stock status
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // Category reference
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
