//product-page.jsx
import React, { useState } from "react";

const ProductPage = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [cart, setCart] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    console.log(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    console.log(`Buying ${product.name}!`);
    // Add logic for immediate purchase
  };

  return (
    <div className="product-page flex">
      {/* Sidebar for Categories */}
      <aside className="w-1/4 p-4 bg-gray-100 border-r">
        <h2 className="font-bold text-lg mb-4">Categories</h2>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              <button
                className={`block w-full text-left px-4 py-2 rounded ${
                  selectedCategory.name === category.name
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h2 className="text-2xl font-bold mb-6">
          Products in {selectedCategory.name}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedCategory.products.map((product, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded mb-4"
              />
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600 mb-4">Price: ${product.price}</p>
              <div className="flex space-x-2">
                <button
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
