import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./admin-panel.css";

// Utility Components
const Button = ({ children, onClick, disabled, variant = "primary", size = "md", className = "" }) => {
  const baseStyle = "font-semibold rounded focus:outline-none transition-colors"
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

const Input = ({ id, name, value, onChange, type = "text", placeholder, required }) => (
  <input
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    type={type}
    placeholder={placeholder}
    required={required}
    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
)

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
    {children}
  </label>
)

const Textarea = ({ id, name, value, onChange, placeholder }) => (
  <textarea
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    rows="3"
  />
)

const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>{children}</div>
)

const CardHeader = ({ children }) => <div className="px-6 py-4 border-b">{children}</div>

const CardContent = ({ children }) => <div className="px-6 py-4">{children}</div>

const CardTitle = ({ children }) => <h2 className="text-xl font-semibold">{children}</h2>

const Switch = ({ id, checked, onChange }) => (
  <label htmlFor={id} className="flex items-center cursor-pointer">
    <div className="relative">
      <input id={id} type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <div className={`block w-14 h-8 rounded-full ${checked ? "bg-blue-500" : "bg-gray-300"}`}></div>
      <div
        className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${checked ? "transform translate-x-6" : ""}`}
      ></div>
    </div>
  </label>
)

const Tabs = ({ children }) => <div className="mb-4">{children}</div>

const TabsList = ({ children }) => <div className="flex border-b">{children}</div>

const TabsTrigger = ({ children, isActive, onClick }) => (
  <button
    className={`px-4 py-2 font-semibold ${
      isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500 hover:text-gray-700"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
)

const TabsContent = ({ children, isActive }) => <div className={isActive ? "block" : "hidden"}>{children}</div>

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  )
}

// Main Component
export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    inStock: true,
    category: "",
  })
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    image: "",
  })
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("categories")
  const [toast, setToast] = useState(null)

  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "123",
  }

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);
  
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      showToast("Failed to fetch products.", "error");
    }
  }, [showToast]); // No warning now
  
  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      showToast("Failed to fetch categories.", "error");
    }
  }, [showToast]); 
  

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts()
      fetchCategories()
    }
  }, [isAuthenticated, fetchProducts, fetchCategories])

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginData.username === ADMIN_CREDENTIALS.username && loginData.password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true)
    } else {
      showToast("Invalid username or password", "error")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setLoginData({ username: "", password: "" })
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData({ ...formData, [name]: type === "number" ? Number.parseFloat(value) : value })
  }

  const handleAddCategory = async () => {
    if (categoryFormData.name.trim()) {
      setLoading(true)
      try {
        const response = await axios.post("http://localhost:5000/api/categories", categoryFormData)
        setCategories([...categories, response.data])
        setCategoryFormData({ name: "", image: "" })
        showToast("Category added successfully!")
      } catch (err) {
        console.error("Error adding category:", err)
        showToast("Failed to add category.", "error")
      } finally {
        setLoading(false)
      }
    } else {
      showToast("Please enter a category name.", "error")
    }
  }

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setLoading(true)
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`)
        setCategories(categories.filter((category) => category._id !== id))
        showToast("Category deleted successfully!")
      } catch (err) {
        console.error("Error deleting category:", err)
        showToast("Failed to delete category.", "error")
      } finally {
        setLoading(false)
      }
    }
  }

  const handleAddProduct = async () => {
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:5000/api/products", formData)
      setProducts([...products, response.data])
      resetForm()
      showToast("Product added successfully!")
    } catch (err) {
      console.error("Error adding product:", err)
      showToast("Failed to add product.", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true)
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`)
        setProducts(products.filter((product) => product._id !== id))
        showToast("Product deleted successfully!")
      } catch (err) {
        console.error("Error deleting product:", err)
        showToast("Failed to delete product.", "error")
      } finally {
        setLoading(false)
      }
    }
  }

  const handleToggleStock = async (id, currentStatus) => {
    setLoading(true)
    try {
      const response = await axios.patch(`http://localhost:5000/api/products/${id}`, {
        inStock: !currentStatus,
      })
      setProducts(
        products.map((product) => (product._id === id ? { ...product, inStock: response.data.inStock } : product)),
      )
      showToast(`Product ${response.data.inStock ? "put in stock" : "put out of stock"} successfully!`)
    } catch (err) {
      console.error("Error updating product stock status:", err)
      showToast("Failed to update product stock status.", "error")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      description: "",
      image: "",
      inStock: true,
      category: "",
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
      

    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>

        <Tabs>
          <TabsList>
            <TabsTrigger isActive={activeTab === "categories"} onClick={() => setActiveTab("categories")}>
              Categories
            </TabsTrigger>
            <TabsTrigger isActive={activeTab === "products"} onClick={() => setActiveTab("products")}>
              Products
            </TabsTrigger>
          </TabsList>

          <TabsContent isActive={activeTab === "categories"}>
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="categoryName">Category Name</Label>
                    <Input
                      id="categoryName"
                      value={categoryFormData.name}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                      placeholder="Enter category name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="categoryImage">Category Image URL</Label>
                    <Input
                      id="categoryImage"
                      value={categoryFormData.image}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, image: e.target.value })}
                      placeholder="Enter category image URL"
                    />
                  </div>
                  {categoryFormData.image && (
                    <div className="mt-2">
                      <img
                        src={categoryFormData.image || "/placeholder.svg"}
                        alt="Category preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <Button onClick={handleAddCategory} disabled={loading}>
                    {loading ? "Adding..." : "Add Category"}
                  </Button>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Existing Categories</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                      <Card key={category._id}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={category.image || "/placeholder.svg"}
                              alt={category.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h4 className="font-semibold">{category.name}</h4>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteCategory(category._id)}
                                disabled={loading}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent isActive={activeTab === "products"}>
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" name="name" value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="productPrice">Price</Label>
                    <Input
                      id="productPrice"
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="productDescription">Description</Label>
                    <Textarea
                      id="productDescription"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="productImage">Image URL</Label>
                    <Input id="productImage" name="image" value={formData.image} onChange={handleInputChange} />
                  </div>
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={formData.image || "/placeholder.svg"}
                        alt="Product preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="productCategory">Category</Label>
                    <select
                      id="productCategory"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="productInStock"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    />
                    <Label htmlFor="productInStock">In Stock</Label>
                  </div>
                  <div className="flex space-x-4">
                    <Button onClick={handleAddProduct} disabled={loading}>
                      {loading ? "Adding..." : "Add Product"}
                    </Button>
                    <Button variant="secondary" onClick={resetForm}>
                      Reset
                    </Button>
                  </div>
                </form>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Existing Products</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                      <Card key={product._id}>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-48 object-cover rounded-lg mb-2"
                            />
                            <h4 className="font-semibold">{product.name}</h4>
                            <p className="text-sm text-gray-500">{product.description}</p>
                            <p className="font-medium">${product.price.toFixed(2)}</p>
                            <div className="flex items-center justify-between">
                              <Switch
                                id={`productInStock-${product._id}`}
                                checked={product.inStock}
                                onChange={() => handleToggleStock(product._id, product.inStock)}
                              />
                              <Label htmlFor={`productInStock-${product._id}`}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </Label>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteProduct(product._id)}
                                disabled={loading}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
