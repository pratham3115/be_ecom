"use client"

import React, { useState, useEffect, useRef } from "react"
import { ShoppingCart, Search, Minus, Plus, Trash2, X, Heart, Eye } from "lucide-react"
import "../styles/product-page.css"

export default function ProductPage() {
  // State declarations
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(new Map())
  const [wishlist, setWishlist] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [showCart, setShowCart] = useState(false)
  const [showQuickView, setShowQuickView] = useState(null)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [showFloatingCart, setShowFloatingCart] = useState(false)

  // Ref declarations
  const headerRef = useRef(null)
  const categoriesRef = useRef(null)

  // Effect for fetching categories
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const categoriesWithImages = data.map((category) => ({
          ...category,
          image: category.image || "/placeholder.svg",
        }))
        setCategories(categoriesWithImages)
        if (categoriesWithImages.length > 0) setSelectedCategory(categoriesWithImages[0])
      })
      .catch((error) => console.error("Error fetching categories:", error))
  }, [])

  // Effect for fetching products based on selected category
  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:5000/api/products?category=${selectedCategory._id}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
    }
  }, [selectedCategory])

  // Effect for handling scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = headerRef.current?.offsetHeight || 0
      const categoriesHeight = categoriesRef.current?.offsetHeight || 0
      setShowFloatingCart(window.scrollY > headerHeight + categoriesHeight)

      if (categoriesRef.current) {
        if (window.scrollY > headerHeight) {
          categoriesRef.current.style.position = "fixed"
          categoriesRef.current.style.top = "0"
          categoriesRef.current.style.left = "0"
          categoriesRef.current.style.right = "0"
          categoriesRef.current.style.zIndex = "40"
          document.body.style.paddingTop = `${categoriesHeight}px`
        } else {
          categoriesRef.current.style.position = "static"
          document.body.style.paddingTop = "0"
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Function to add a product to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart)
      const item = newCart.get(product._id)
      if (item) {
        newCart.set(product._id, { ...item, quantity: item.quantity + 1 })
      } else {
        newCart.set(product._id, { ...product, quantity: 1 })
      }
      return newCart
    })
  }

  // Function to change the quantity of a product in the cart
  const handleQuantityChange = (productId, change) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart)
      const item = newCart.get(productId)
      if (item) {
        const newQuantity = item.quantity + change
        if (newQuantity <= 0) {
          newCart.delete(productId)
        } else {
          newCart.set(productId, { ...item, quantity: newQuantity })
        }
      }
      return newCart
    })
  }

  // Function to remove a product from the cart
  const handleRemove = (productId) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart)
      newCart.delete(productId)
      return newCart
    })
  }

  // Function to handle the checkout process
  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      setCart(new Map())
      setIsCheckingOut(false)
      alert("Thank you for your purchase!")
    }, 2000)
  }

  // Function to toggle a product in the wishlist
  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      const newWishlist = new Set(prevWishlist)
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId)
      } else {
        newWishlist.add(productId)
      }
      return newWishlist
    })
  }

  // Calculate the total price of items in the cart
  const totalPrice = Array.from(cart.values()).reduce((total, item) => total + item.price * item.quantity, 0)

  // Filter products based on the search term
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#f8f5f1]">
      {/* Categories Navigation */}
      <nav ref={categoriesRef} className="categories-nav">
        <div className="container">
          <div className="nav-content">
            {/* Categories section with horizontal scrolling and mouse wheel support */}
            <div
              className="categories-scroll"
              ref={(el) => {
                if (el) {
                  el.addEventListener("wheel", (e) => {
                    if (e.deltaY !== 0) {
                      e.preventDefault()
                      el.scrollBy({
                        left: e.deltaY,
                        behavior: "smooth",
                      })
                    }
                  })
                }
              }}
            >
              {categories.map((category) => (
                <button
                  key={category._id}
                  className={`category-button ${selectedCategory?._id === category._id ? "selected" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search and Cart section */}
            <div className="search-cart">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <button onClick={() => setShowCart(true)} className="cart-button">
                <ShoppingCart className="cart-icon" />
                {cart.size > 0 && <span className="cart-count">{cart.size}</span>}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Shop by Category */}
      <div className="shop-by-category">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="category-grid">
            {categories.map((category) => (
              <button
                key={category._id}
                className={`category-item ${selectedCategory?._id === category._id ? "selected" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                <div className="category-image-container">
                  <img
                    src={category.image || "/placeholder.svg"} // Fallback to placeholder if image doesn't exist
                    alt={category.name}
                    className="category-image"
                  />
                </div>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Product List */}
      <main className="main-content">
        <div className="container">
          <h2 className="section-title">{selectedCategory?.name || "Products"}</h2>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                  <img src={product.image || "/placeholder.png"} alt={product.name} className="product-image" />
                  <div className="product-actions">
                    <button
                      onClick={() => toggleWishlist(product._id)}
                      className={`wishlist-button ${wishlist.has(product._id) ? "in-wishlist" : ""}`}
                    >
                      <Heart className="action-icon" />
                    </button>
                    <button onClick={() => setShowQuickView(product)} className="quickview-button">
                      <Eye className="action-icon" />
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Cart Icon */}
      {showFloatingCart && (
        <button onClick={() => setShowCart(true)} className="floating-cart-button">
          <ShoppingCart className="floating-cart-icon" />
          {cart.size > 0 && <span className="floating-cart-count">{cart.size}</span>}
        </button>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2 className="cart-title">Your Cart</h2>
              <button onClick={() => setShowCart(false)} className="close-cart-button">
                <X className="close-icon" />
              </button>
            </div>
            <div className="cart-items">
              {Array.from(cart.values()).map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-image-container">
                    <img src={item.image || "/placeholder.png"} alt={item.name} className="cart-item-image" />
                  </div>
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    <div className="cart-item-quantity">
                      <button onClick={() => handleQuantityChange(item._id, -1)} className="quantity-button">
                        <Minus className="quantity-icon" />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item._id, 1)} className="quantity-button">
                        <Plus className="quantity-icon" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => handleRemove(item._id)} className="remove-item-button">
                    <Trash2 className="remove-icon" />
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span className="total-label">Total:</span>
                <span className="total-value">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                className={`checkout-button ${cart.size === 0 || isCheckingOut ? "disabled" : ""}`}
                onClick={handleCheckout}
                disabled={cart.size === 0 || isCheckingOut}
              >
                {isCheckingOut ? "Processing..." : "Checkout"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="quickview-overlay" onClick={() => setShowQuickView(null)}>
          <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="quickview-header">
              <h2 className="quickview-title">{showQuickView.name}</h2>
              <button onClick={() => setShowQuickView(null)} className="close-quickview-button">
                <X className="close-icon" />
              </button>
            </div>
            <div className="quickview-content">
              <div className="quickview-image-container">
                <img
                  src={showQuickView.image || "/placeholder.png"}
                  alt={showQuickView.name}
                  className="quickview-image"
                />
              </div>
              <div className="quickview-details">
                <p className="quickview-description">{showQuickView.description || "No description available."}</p>
                <p className="quickview-price">${showQuickView.price.toFixed(2)}</p>
                <button
                  onClick={() => {
                    handleAddToCart(showQuickView)
                    setShowQuickView(null)
                  }}
                  className="quickview-add-to-cart-button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

