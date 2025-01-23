import { useState, useEffect } from "react";
import axios from "axios";

// Custom UI Components
const Button = ({ children, variant = "primary", ...props }) => {
  const styles =
    variant === "primary"
      ? "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      : "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600";
  return (
    <button {...props} className={`${styles} ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      {children}
    </button>
  );
};

const Input = (props) => <input {...props} className="w-full px-4 py-2 border rounded focus:outline-none" />;
const Label = ({ children }) => <label className="font-semibold text-gray-700">{children}</label>;
const Textarea = (props) => <textarea {...props} className="w-full px-4 py-2 border rounded focus:outline-none" />;
const Card = ({ children }) => <div className="p-4 bg-white rounded shadow">{children}</div>;
const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
const CardTitle = ({ children }) => <h2 className="text-xl font-bold">{children}</h2>;
const CardContent = ({ children }) => <div>{children}</div>;
const Switch = ({ checked, onCheckedChange }) => (
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="toggle-switch"
    />
    <span className="ml-2">{checked ? "In Stock" : "Out of Stock"}</span>
  </label>
);

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    inStock: true,
    category: "",
  });
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "password123",
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchCategories();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Failed to fetch categories.");
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginData.username === ADMIN_CREDENTIALS.username &&
      loginData.password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ username: "", password: "" });
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: type === "number" ? parseFloat(value) : value });
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:5000/api/categories", { name: newCategory });
        setCategories([...categories, response.data]);
        setNewCategory("");
        alert("Category added successfully!");
      } catch (err) {
        console.error("Error adding category:", err);
        alert("Failed to add category.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a category name.");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        setCategories(categories.filter((category) => category._id !== id));
        alert("Category deleted successfully!");
      } catch (err) {
        console.error("Error deleting category:", err);
        alert("Failed to delete category.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/products", formData);
      setProducts([...products, response.data]);
      resetForm();
      alert("Product added successfully!");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        alert("Product deleted successfully!");
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete product.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleStock = async (id, currentStatus) => {
    setLoading(true);
    try {
      const response = await axios.patch(`http://localhost:5000/api/products/${id}`, {
        inStock: !currentStatus,
      });
      setProducts(
        products.map((product) =>
          product._id === id ? { ...product, inStock: response.data.inStock } : product
        )
      );
      alert(`Product ${response.data.inStock ? "put in stock" : "put out of stock"} successfully!`);
    } catch (err) {
      console.error("Error updating product stock status:", err);
      alert("Failed to update product stock status.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      description: "",
      image: "",
      inStock: true,
      category: "",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-sm p-6">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
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
              <div>
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>

        {/* Add Category */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add a New Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
              />
              <Button onClick={handleAddCategory} disabled={loading}>
                {loading ? "Adding..." : "Add"}
              </Button>
            </div>
            <ul className="mt-4">
              {categories.map((category) => (
                <li key={category._id} className="flex justify-between items-center mb-2">
                  <span>{category.name}</span>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteCategory(category._id)}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Add Product */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <Label>Product Name</Label>
                <Input name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea name="description" value={formData.description} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input name="image" value={formData.image} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Category</Label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Switch
                  checked={formData.inStock}
                  onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
                />
              </div>
              <div className="flex space-x-4">
                <Button onClick={handleAddProduct} disabled={loading}>
                  {loading ? "Saving..." : "Add Product"}
                </Button>
                <Button variant="danger" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Product List */}
        <Card>
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {products.map((product) => (
                <li key={product._id} className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="text-gray-600">Price: ${product.price}</p>
                    <p className="text-gray-600">{product.inStock ? "In Stock" : "Out of Stock"}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Switch
                      checked={product.inStock}
                      onCheckedChange={() => handleToggleStock(product._id, product.inStock)}
                    />
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteProduct(product._id)}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
