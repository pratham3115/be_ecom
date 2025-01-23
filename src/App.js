import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./customer/components/navigation/navigation";
import Home from "./customer/components/home";
import ProductPage from "./customer/components/product-page";
import AdminPanel from "./customer/components/admin-panel"; // Import AdminPanel

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />

          {/* Product page route */}
          <Route path="/products" element={<ProductPage />} />

          {/* Admin Panel route */}
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
