import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import AdminProducts from './pages/AdminProducts';
import Cart from './pages/Cart';
import UserOrders from './pages/UserOrders';
import AdminCategories from './pages/AdminCategories';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-5 mt-4 container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<UserOrders />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
