"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShoppingCart, Search, Minus, Plus, Trash2, X, Heart, Eye } from "lucide-react";

export default function ProductPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(new Map());
  const [wishlist, setWishlist] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showQuickView, setShowQuickView] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showFloatingCart, setShowFloatingCart] = useState(false);

  const headerRef = useRef(null);
  const categoriesRef = useRef(null);

  useEffect(() => {
    // Fetch categories
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setSelectedCategory(data[0]);
      });
  }, []);

  useEffect(() => {
    // Fetch products for the selected category
    if (selectedCategory) {
      fetch(`http://localhost:5000/api/products?category=${selectedCategory._id}`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }, [selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const categoriesHeight = categoriesRef.current?.offsetHeight || 0;
      setShowFloatingCart(window.scrollY > headerHeight + categoriesHeight);

      if (categoriesRef.current) {
        if (window.scrollY > headerHeight) {
          categoriesRef.current.style.position = "fixed";
          categoriesRef.current.style.top = "0";
          categoriesRef.current.style.left = "0";
          categoriesRef.current.style.right = "0";
          categoriesRef.current.style.zIndex = "40";
          document.body.style.paddingTop = `${categoriesHeight}px`;
        } else {
          categoriesRef.current.style.position = "static";
          document.body.style.paddingTop = "0";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      const item = newCart.get(product._id);
      if (item) {
        newCart.set(product._id, { ...item, quantity: item.quantity + 1 });
      } else {
        newCart.set(product._id, { ...product, quantity: 1 });
      }
      return newCart;
    });
  };

  const handleQuantityChange = (productId, change) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      const item = newCart.get(productId);
      if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) {
          newCart.delete(productId);
        } else {
          newCart.set(productId, { ...item, quantity: newQuantity });
        }
      }
      return newCart;
    });
  };

  const handleRemove = (productId) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      newCart.delete(productId);
      return newCart;
    });
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setCart(new Map());
      setIsCheckingOut(false);
      alert("Thank you for your purchase!");
    }, 2000);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      const newWishlist = new Set(prevWishlist);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const totalPrice = Array.from(cart.values()).reduce((total, item) => total + item.price * item.quantity, 0);

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#f8f5f1]">
      {/* Custom Scrollbar Styles */}
      <style>
        {`
          .scrollbar-thin::-webkit-scrollbar {
            height: 6px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: #2d4739;
            border-radius: 8px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: #e5e5e5;
            border-radius: 8px;
          }
        `}
      </style>

      {/* Categories Navigation */}
      <nav ref={categoriesRef} className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Categories section with horizontal scrolling and mouse wheel support */}
            <div
              className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 py-2"
              style={{ scrollBehavior: "smooth" }}
              ref={(el) => {
                if (el) {
                  el.addEventListener("wheel", (e) => {
                    if (e.deltaY !== 0) {
                      e.preventDefault();
                      el.scrollBy({
                        left: e.deltaY,
                        behavior: "smooth",
                      });
                    }
                  });
                }
              }}
            >
              {categories.map((category) => (
                <button
                  key={category._id}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors rounded-lg shadow-md ${
                    selectedCategory?._id === category._id
                      ? "text-white bg-[#2d4739]"
                      : "text-gray-600 bg-transparent hover:text-[#2d4739] hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search and Cart section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-full border border-gray-200 pl-10 pr-4 py-2 focus:border-[#2d4739] focus:outline-none focus:ring-2 focus:ring-[#2d4739]/20"
                />
              </div>
              <button
                onClick={() => setShowCart(true)}
                className="relative rounded-full bg-[#2d4739] p-2 text-white hover:bg-[#1a2f24] focus:outline-none focus:ring-2 focus:ring-[#2d4739]/20 transition-colors duration-200"
              >
                <ShoppingCart className="h-6 w-6" />
                {cart.size > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {cart.size}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-6 text-[#2d4739]">{selectedCategory?.name || "Products"}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative aspect-square">
                <img
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className={`p-1 rounded-full ${
                      wishlist.has(product._id) ? "bg-red-500 text-white" : "bg-white text-gray-600"
                    } hover:bg-red-500 hover:text-white transition-colors duration-200`}
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setShowQuickView(product)}
                    className="p-1 rounded-full bg-white text-gray-600 hover:bg-[#2d4739] hover:text-white transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-gray-900 truncate">{product.name}</h3>
                <p className="mt-1 text-lg font-bold text-[#2d4739]">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 w-full rounded-lg bg-[#2d4739] px-3 py-1 text-xs text-white hover:bg-[#1a2f24] focus:outline-none focus:ring-2 focus:ring-[#2d4739]/20 transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Cart Icon */}
      {showFloatingCart && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-4 right-4 z-50 rounded-full bg-[#2d4739] p-3 text-white shadow-lg hover:bg-[#1a2f24] focus:outline-none focus:ring-2 focus:ring-[#2d4739]/20 transition-colors duration-200"
        >
          <ShoppingCart className="h-6 w-6" />
          {cart.size > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {cart.size}
            </span>
          )}
        </button>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowCart(false)}>
          <div className="absolute right-0 h-full w-96 bg-white p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2d4739]/20"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                {Array.from(cart.values()).map((item) => (
                  <div key={item._id} className="mb-4 flex items-center space-x-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md">
                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                      <div className="mt-1 flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item._id, -1)}
                          className="rounded-full bg-gray-100 p-1 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2d4739]/20"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item._id, 1)}
                          className="rounded-full bg-gray-100 p-1 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2d4739]/20"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-gray-400 hover:text-red-500 focus:outline-none"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="mb-4 flex justify-between">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  className={`w-full rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2d4739]/20 ${
                    cart.size === 0 || isCheckingOut
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#2d4739] hover:bg-[#1a2f24]"
                  } transition-colors duration-200`}
                  onClick={handleCheckout}
                  disabled={cart.size === 0 || isCheckingOut}
                >
                  {isCheckingOut ? "Processing..." : "Checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {showQuickView && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setShowQuickView(null)}
        >
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{showQuickView.name}</h2>
              <button
                onClick={() => setShowQuickView(null)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square">
                <img
                  src={showQuickView.image || "/placeholder.png"}
                  alt={showQuickView.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-4">{showQuickView.description || "No description available."}</p>
                <p className="text-2xl font-bold text-[#2d4739] mb-4">${showQuickView.price.toFixed(2)}</p>
                <button
                  onClick={() => {
                    handleAddToCart(showQuickView)
                    setShowQuickView(null)
                  }}
                  className="w-full rounded-lg bg-[#2d4739] px-4 py-2 text-white hover:bg-[#1a2f24] focus:outline-none focus:ring-2 focus:ring-[#2d4739]/20 transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


      
