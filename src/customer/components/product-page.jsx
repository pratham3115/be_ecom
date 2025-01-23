import React, { useState, useEffect } from "react";
import axios from "axios";
import "./product-page-animation.css";

const ProductPage = () => {
  const [categories, setCategories] = useState([]); // Categories from backend
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category
  const [cart, setCart] = useState(new Map()); // Cart state (using Map for efficient lookups)
  const [showCart, setShowCart] = useState(false); // Toggle cart view
  const [products, setProducts] = useState([]); // Products state for the selected category
  const [loading, setLoading] = useState(true); // Loading state for category and products

  // Fetch categories from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => {
        if (response.data.length > 0) {
          setCategories(response.data);
          setSelectedCategory(response.data[0]); // Default to the first category
          setLoading(false); // Stop loading once categories are fetched
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  // Fetch products based on selected category
  useEffect(() => {
    if (selectedCategory) {
      setLoading(true); // Show loading spinner
      axios
        .get(`http://localhost:5000/api/products?category=${selectedCategory._id}`)
        .then((response) => {
          setProducts(response.data);
          setLoading(false); // Stop loading once products are fetched
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          setLoading(false);
        });
    }
  }, [selectedCategory]);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = new Map(prevCart);
      if (updatedCart.has(product._id)) {
        const item = updatedCart.get(product._id);
        item.quantity += 1;
      } else {
        updatedCart.set(product._id, { ...product, quantity: 1 });
      }
      return updatedCart;
    });
  };

  // Handle Buy Now
  const handleBuyNow = (product) => {
    alert(`Buying ${product.name} for $${product.price.toFixed(2)}!`);
  };

  // Toggle cart visibility
  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  // Remove a product from the cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = new Map(prevCart);
      updatedCart.delete(productId);
      return updatedCart;
    });
  };

  // Adjust product quantity in the cart
  const handleQuantityChange = (productId, delta) => {
    setCart((prevCart) => {
      const updatedCart = new Map(prevCart);
      const item = updatedCart.get(productId);
      if (item) {
        item.quantity = Math.max(item.quantity + delta, 1);
      }
      return updatedCart;
    });
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of cart.values()) {
      total += item.price * item.quantity;
    }
    return total;
  };

  return (
    <div className="product-page flex">
      {/* Sidebar for Categories */}
      <aside className="sidebar w-1/4 p-4 bg-gray-100 border-r">
        <h2 className="font-bold text-lg mb-4">Categories</h2>
        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          <ul>
            {categories.map((category) => (
              <li key={category._id}>
                <button
                  className={`block w-full text-left px-4 py-2 rounded ${
                    selectedCategory?._id === category._id
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
        )}
      </aside>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {showCart
              ? "Your Cart"
              : `Products in ${selectedCategory?.name || "Category"}`}
          </h2>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleCartClick}
          >
            {showCart ? "Hide Cart" : `Cart (${cart.size})`}
          </button>
        </div>

        {/* Cart View */}
        {showCart ? (
          <div className="cart bg-gray-50 p-6 rounded shadow-md">
            {cart.size > 0 ? (
              <>
                <ul className="space-y-4">
                  {Array.from(cart.values()).map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center justify-between bg-white p-4 rounded shadow hover:shadow-lg"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded mr-4"
                        />
                        <div>
                          <p className="font-bold text-lg">{item.name}</p>
                          <p className="text-gray-600">Price: ${item.price}</p>
                          <div className="flex items-center mt-2">
                            <button
                              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                              onClick={() =>
                                handleQuantityChange(item._id, -1)
                              }
                            >
                              -
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button
                              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                              onClick={() =>
                                handleQuantityChange(item._id, 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-6 font-bold text-lg">
                  <span>Total Price:</span>
                  <span>${calculateTotalPrice().toFixed(2)}</span>
                </div>
                <button
                  className="w-full mt-6 bg-green-500 text-white py-3 px-4 rounded hover:bg-green-600"
                  onClick={() => alert("Purchase complete!")}
                >
                  Buy Now
                </button>
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 mb-4">Price: ${product.price}</p>
                  <p
                    className={`text-sm ${
                      product.inStock ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
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
              ))
            ) : (
              <p>No products available in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
