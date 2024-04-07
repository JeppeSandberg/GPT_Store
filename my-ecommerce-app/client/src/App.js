import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import Products from './Components/Products';
import ProductDetails from './Components/ProductDetails';
import Register from './Components/RegisterForm';
import Login from './Components/LoginForm';
import Cart from './Components/Cart';
import Categories from './Components/Categories';
import AdminPage from './Components/AdminPage';
import PrivateRoute from './Components/PrivateRoute';
import { CartProvider } from './CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>My Ecommerce App</h1>
            <Link to="/">Home</Link>
          </header>
          <Categories />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/categories/:categoryId" element={<Products />} />
            <Route path="/admin" element={<PrivateRoute />}>
              <Route path="" element={<AdminPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;