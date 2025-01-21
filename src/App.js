import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './customer/components/navigation/navigation';
import Home from './customer/components/home';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<Home />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
