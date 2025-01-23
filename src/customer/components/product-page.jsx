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
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of products per page

  // Fetch categories from backend
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => {
        if (response.data.length > 0) {
          setCategories(response.data);
          setSelectedCategory(response.data[0]);
        }
      })
      .catch((err) => setError("Failed to load categories"))
      .finally(() => setLoading(false));
  }, []);

  // Fetch products based on selected category
  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/products?category=${selectedCategory._id}`)
        .then((response) => setProducts(response.data))
        .catch(() => setError("Failed to load products"))
        .finally(() => setLoading(false));
    }
  }, [selectedCategory]);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when category changes
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

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate products
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Product List or Loading */}
        {loading ? (
          <p>Loading products...</p>
        ) : showCart ? (
          <div className="cart">
            {/* Render cart items */}
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
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 mb-4">Price: ${product.price}</p>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              {Array.from({
                length: Math.ceil(filteredProducts.length / itemsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  className={`mx-1 px-4 py-2 border ${
                    currentPage === index + 1 ? "bg-indigo-500 text-white" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
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
