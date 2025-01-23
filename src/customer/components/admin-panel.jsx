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

  // Fetch products and categories from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        console.log("Fetched products:", response.data); // Debug fetched products
        setProducts(response.data || []); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products. Please try again.");
      }
    };


    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        console.log("Fetched categories:", response.data); // Debug fetched categories
        setCategories(response.data || []); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to fetch categories. Please try again.");
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  /// Handle form input changes
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

  // Handle deleting a category
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

  // Add a new product
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

  // Edit a product
  const handleEditProduct = (id) => {
    setLoading(true);
    axios
      .put(`http://localhost:5000/api/products/${id}`, formData)
      .then((response) => {
        setProducts(products.map((p) => (p._id === id ? response.data : p)));
        resetForm();
        alert("Product updated successfully!");
      })
      .catch((err) => {
        console.error("Error editing product:", err);
        alert("Failed to edit product.");
      })
      .finally(() => setLoading(false));
  };

  // Delete a product
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

  // Mark product as out of stock
  const handleMarkOutOfStock = (id) => {
    setLoading(true);
    axios
      .put(`http://localhost:5000/api/products/${id}`, { inStock: false })
      .then((response) => {
        setProducts(products.map((p) => (p._id === id ? response.data : p)));
        alert("Product marked as out of stock!");
      })
      .catch((err) => {
        console.error("Error marking product as out of stock:", err);
        alert("Failed to mark product as out of stock.");
      })
      .finally(() => setLoading(false));
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

      {/* Add Category Section */}
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
        <button
          onClick={formData._id ? () => handleEditProduct(formData._id) : handleAddProduct}
          disabled={loading}
        >
          {loading ? "Processing..." : formData._id ? "Update Product" : "Add Product"}
        </button>
        <button type="button" onClick={resetForm}>
          Cancel
        </button>
      </form>

      {/* Product List */}
      <div>
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
              <button onClick={() => setFormData(product)}>Edit</button>
              <button onClick={() => handleDeleteProduct(product._id)} disabled={loading}>
                Delete
              </button>
              {product.inStock && (
                <button onClick={() => handleMarkOutOfStock(product._id)} disabled={loading}>
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
