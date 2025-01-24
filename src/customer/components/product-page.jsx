import React, { useState, useEffect } from "react";
import axios from "axios";
import "./product-page-animation.css";

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState(new Map());
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:27017/api/categories")
      .then((response) => {
        if (response.data.length > 0) {
          setCategories(response.data);
          setSelectedCategory(response.data[0]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`http://localhost:27017/api/products?category=${selectedCategory._id}`)
        .then((response) => {
          setProducts(response.data);
          setCurrentPage(1);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setShowCart(false); // Auto-hide cart when selecting a category
  };

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

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = new Map(prevCart);
      updatedCart.delete(productId);
      return updatedCart;
    });
  };

  const handleQuantityChange = (productId, change) => {
    setCart((prevCart) => {
      const updatedCart = new Map(prevCart);
      const item = updatedCart.get(productId);

      if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) {
          updatedCart.delete(productId); // Remove product if quantity is 0
        } else {
          item.quantity = newQuantity;
          updatedCart.set(productId, item);
        }
      }

      return updatedCart;
    });
  };

  const calculateTotalPrice = () => {
    return Array.from(cart.values()).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleBuyNow = (product) => {
    alert(`Proceeding to buy: ${product.name}`);
    // Redirect to checkout or payment page logic can be added here
  };

  const handleBuyCart = () => {
    alert("Proceeding to buy all items in the cart.");
    // Redirect to checkout or payment page logic can be added here
  };

  const renderCartItems = () =>
    Array.from(cart.values()).map((item) => (
      <div
        key={item._id}
        className="flex items-center border rounded-lg p-4 shadow-sm hover:shadow-lg transition mb-4"
      >
        <img
          src={item.image || "/placeholder.png"}
          alt={item.name}
          className="w-16 h-16 object-cover rounded mr-4"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="text-gray-600">Price: ${item.price}</p>
          <div className="flex items-center mt-2">
            <button
              className="bg-gray-200 px-2 py-1 rounded"
              onClick={() => handleQuantityChange(item._id, -1)}
            >
              -
            </button>
            <span className="px-4">{item.quantity}</span>
            <button
              className="bg-gray-200 px-2 py-1 rounded"
              onClick={() => handleQuantityChange(item._id, 1)}
            >
              +
            </button>
          </div>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
          onClick={() => handleRemoveFromCart(item._id)}
        >
          Remove
        </button>
      </div>
    ));

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="product-page flex">
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

      <div className="w-3/4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {showCart ? "Your Cart" : `Products in ${selectedCategory?.name || "Category"}`}
          </h2>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded"
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setShowCart(!showCart)}
          >
            {showCart ? "Hide Cart" : `Cart (${cart.size})`}
          </button>
        </div>

        {showCart ? (
          <div>
            {cart.size > 0 ? (
              <>
                <div>{renderCartItems()}</div>
                <div className="flex justify-between items-center mt-4">
                  <h3 className="text-lg font-semibold">
                    Total: ${calculateTotalPrice().toFixed(2)}
                  </h3>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleBuyCart}
                  >
                    Buy Now
                  </button>
                </div>
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition"
                >
                  <img
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 mb-4">Price: ${product.price}</p>
                  <div className="flex space-x-2">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                className="bg-gray-300 py-1 px-4 rounded disabled:opacity-50"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="bg-gray-300 py-1 px-4 rounded disabled:opacity-50"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;