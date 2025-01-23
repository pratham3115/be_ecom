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
    category: "", // Category field for products
  });
  const [newCategory, setNewCategory] = useState(""); // For adding a new category

  // Fetch products and categories from API
  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((response) => {
      setProducts(response.data);
    });

    axios.get("http://localhost:5000/api/categories").then((response) => {
      setCategories(response.data); // Store existing categories
    });
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle category selection change
  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  // Add a new product
  const handleAddProduct = () => {
    axios
      .post("http://localhost:5000/api/products", formData)
      .then((response) => {
        setProducts([...products, response.data]);
        setFormData({
          name: "",
          price: "",
          description: "",
          image: "",
          inStock: true,
          category: "",
        });
      })
      .catch((err) => console.error(err));
  };

  // Edit a product
  const handleEditProduct = (id) => {
    axios
      .put(`http://localhost:5000/api/products/${id}`, formData)
      .then((response) => {
        setProducts(products.map((p) => (p._id === id ? response.data : p)));
        setFormData({
          name: "",
          price: "",
          description: "",
          image: "",
          inStock: true,
          category: "",
        });
      })
      .catch((err) => console.error(err));
  };

  // Delete a product
  const handleDeleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter((p) => p._id !== id));
      })
      .catch((err) => console.error(err));
  };

  // Handle adding a new category
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      axios
        .post("http://localhost:5000/api/categories", { name: newCategory })
        .then((response) => {
          setCategories([...categories, response.data]);
          setNewCategory(""); // Clear the input field
          alert("Category added successfully!");
        })
        .catch((error) => {
          console.error("Error adding category:", error);
          alert("Failed to add category.");
        });
    } else {
      alert("Please enter a category name.");
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = (id) => {
    axios
      .delete(`http://localhost:5000/api/categories/${id}`)
      .then(() => {
        setCategories(categories.filter((category) => category._id !== id));
        alert("Category deleted successfully!");
      })
      .catch((err) => {
        console.error("Error deleting category:", err);
        alert("Failed to delete category.");
      });
  };

  // Mark product as out of stock
  const handleMarkOutOfStock = (id) => {
    axios
      .put(`http://localhost:5000/api/products/${id}`, { inStock: false })
      .then((response) => {
        setProducts(products.map((p) => (p._id === id ? response.data : p)));
      })
      .catch((err) => console.error("Error marking out of stock:", err));
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Add Category Section */}
      <h2>Add a New Category</h2>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Enter category name"
      />
      <button onClick={handleAddCategory}>Add Category</button>

      <h3>Existing Categories</h3>
      <ul>
        {categories.map((category) => (
          <li key={category._id} className="category-item">
            {category.name}
            <button
              className="delete-btn"
              onClick={() => handleDeleteCategory(category._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Add/Edit Product Section */}
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

        {/* Category Selector */}
        <select
          name="category"
          value={formData.category}
          onChange={handleCategoryChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          onClick={
            formData._id
              ? () => handleEditProduct(formData._id)
              : handleAddProduct
          }
        >
          {formData._id ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <div className="product-list">
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id} className="product-item">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
              <button onClick={() => setFormData(product)}>Edit</button>
              <button onClick={() => handleDeleteProduct(product._id)}>
                Delete
              </button>
              {product.inStock && (
                <button onClick={() => handleMarkOutOfStock(product._id)}>
                  Mark as Out of Stock
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
