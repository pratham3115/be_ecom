import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./customer/components/navigation/navigation";
import Home from "./customer/components/home";
import ProductPage from "./customer/components/product-page";

function App() {
  // Function to assign unique IDs to each product
  const assignUniqueIds = (categories) => {
    let currentId = 1;
    return categories.map((category) => ({
      ...category,
      products: category.products.map((product) => ({
        ...product,
        id: currentId++, // Assign a unique ID to each product
      })),
    }));
  };

  // Original categories array (without guaranteed unique IDs)
  const rawCategories = [
    {
      name: "Electronics",
      products: [
        { name: "Laptop", price: 1000, image: "laptop.jpg" },
        { name: "Smartphone", price: 500, image: "smartphone.jpg" },
      ],
    },
    {
      name: "Clothing",
      products: [
        { name: "T-Shirt", price: 20, image: "tshirt.jpg" },
        { name: "Jeans", price: 40, image: "jeans.jpg" },
      ],
    },
    {
      name: "Machines",
      products: [
        { name: "Warp Knitting Machine", price: 2000, image: "machine.jpg" },
      ],
    },
  ];

  // Updated categories with unique IDs
  const categories = assignUniqueIds(rawCategories);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />

          {/* Product page route */}
          <Route
            path="/products"
            element={<ProductPage categories={categories} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
