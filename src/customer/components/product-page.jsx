import React, { useState, useEffect } from "react";

const ProductPage = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowCart(false); // Auto-hide cart when changing categories
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex >= 0) {
      // If product exists, increase its quantity
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      // Add new product with quantity = 1
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    console.log("Updated Cart:", updatedCart);
  };

  // Handle Buy Now button
  const handleBuyNow = (product) => {
    alert(`You bought ${product.name} for $${product.price * (product.quantity || 1)}!`);
  };

  // Toggle cart visibility
  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  // Remove a product from the cart
  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  // Adjust product quantity in the cart
  const handleQuantityChange = (productId, delta) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
        : item
    );
    setCart(updatedCart);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {showCart ? "Your Cart" : `Products in ${selectedCategory.name}`}
          </h2>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleCartClick}
          >
            {showCart ? "Hide Cart" : `Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)})`}
          </button>
        </div>

        {/* Cart View */}
        {showCart ? (
          <div className="cart bg-gray-50 p-6 rounded shadow-md">
            {cart.length > 0 ? (
              <>
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li
                      key={item.id}
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
                              onClick={() => handleQuantityChange(item.id, -1)}
                            >
                              -
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button
                              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                              onClick={() => handleQuantityChange(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleRemoveFromCart(item.id)}
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
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        ) : (
          /* Product List View */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {selectedCategory.products.map((product) => (
              <div
                key={product.id}
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
        )}
      </div>
    </div>
  );
};

export default ProductPage;
