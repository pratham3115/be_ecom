import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin-panel.css";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    inStock: true,
    category: "",
  });
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products. Please try again.");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to fetch categories. Please try again.");
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setLoading(true);
      axios
        .post("http://localhost:5000/api/categories", { name: newCategory })
        .then((response) => {
          setCategories([...categories, response.data]);
          setNewCategory("");
          alert("Category added successfully!");
        })
        .catch((err) => {
          console.error("Error adding category:", err);
          alert("Failed to add category.");
        })
        .finally(() => setLoading(false));
    } else {
      alert("Please enter a category name.");
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setLoading(true);
      axios
        .delete(`http://localhost:5000/api/categories/${id}`)
        .then(() => {
          setCategories(categories.filter((category) => category._id !== id));
          alert("Category deleted successfully!");
        })
        .catch((err) => {
          console.error("Error deleting category:", err);
          alert("Failed to delete category.");
        })
        .finally(() => setLoading(false));
    }
  };

  const handleAddProduct = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/products", formData)
      .then((response) => {
        setProducts([...products, response.data]);
        resetForm();
        alert("Product added successfully!");
      })
      .catch((err) => {
        console.error("Error adding product:", err);
        alert("Failed to add product.");
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      axios
        .delete(`http://localhost:5000/api/products/${id}`)
        .then(() => {
          setProducts(products.filter((product) => product._id !== id));
          alert("Product deleted successfully!");
        })
        .catch((err) => {
          console.error("Error deleting product:", err);
          alert("Failed to delete product.");
        })
        .finally(() => setLoading(false));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      image: "",
      inStock: true,
      category: "",
    });
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <h2>Add a New Category</h2>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Enter category name"
      />
      <button onClick={handleAddCategory} disabled={loading}>
        {loading ? "Adding..." : "Add Category"}
      </button>

      <h3>Existing Categories</h3>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <button onClick={() => handleDeleteCategory(category._id)} disabled={loading}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2>{formData._id ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Product Name"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <label>
          In Stock:
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleInputChange}
          />
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddProduct} disabled={loading}>
          {loading ? "Processing..." : "Add Product"}
        </button>
        <button type="button" onClick={resetForm}>
          Cancel
        </button>
      </form>

      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
            <button onClick={() => handleDeleteProduct(product._id)} disabled={loading}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
