import React, { useState, useEffect } from 'react';
import { getProducts, getOrders, updateProduct } from '../Services/api';

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
    getOrders().then(setOrders);
  }, []);

  const handleUpdateProduct = (id, data) => {
    updateProduct(id, data).then(updatedProduct => {
      setProducts(products.map(product => product.id === id ? updatedProduct : product));
    });
  };

  return (
    <div>
      <h1>Admin Page</h1>

      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <button onClick={() => handleUpdateProduct(product.id, { ...product, name: 'New Name' })}>
            Update Product
          </button>
        </div>
      ))}

      <h2>Orders</h2>
      {orders.map(order => (
        <div key={order.id}>
          <h3>Order {order.id}</h3>
          <p>User ID: {order.userId}</p>
          <p>Total: {order.total}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;