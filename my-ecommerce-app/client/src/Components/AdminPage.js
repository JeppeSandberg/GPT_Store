import React, { useState, useEffect } from 'react';
import { getProducts, getOrders, addProduct, getCategories, updateProduct, removeProduct } from '../Services/api';
import '../App.css';
import withAuthentication from '../withAuthentication';

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [addingProduct, setAddingProduct] = useState({ name: '', description: '', price: 0, stock: 0, categoryId: '' });
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProduct, setEditingProduct] = useState({ name: '', description: '', price: 0, stock: 0, categoryId: '' });
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    getProducts().then(setProducts);
    getOrders().then(setOrders);
    getCategories().then(categories => {
      setCategories(categories);
      setLoading(false);
    });
  }, []);

  const handleAddProduct = product => {
    addProduct(product).then(newProduct => {
      setProducts([...products, newProduct]);
      setAddingProduct({ name: '', description: '', price: 0, stock: 0, categoryId: '' });
    });
  };

  const handleUpdateProduct = (id, data) => {
    updateProduct(id, data).then(updatedProduct => {
      setProducts(products.map(product => product.id === id ? updatedProduct : product));
      setEditingProductId(null);
    });
  };

  const handleRemoveProduct = (id) => {
    removeProduct(id).then(() => {
      setProducts(products.filter(product => product.id !== id));
    });
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>

      <h2>Products</h2>
      <div className="products-container">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          {editingProductId === product.id ? (
            <form className="admin-form" onSubmit={e => { e.preventDefault(); handleUpdateProduct(product.id, editingProduct); }}>
              <label>
                Name:
                <input className="admin-input" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} />
              </label>
              <label>
                Description:
                <input className="admin-input" value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} />
              </label>
              <label>
                Price:
                <input className="admin-input" type="number" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })} />
              </label>
              <label>
                Stock:
                <input type="number" value={editingProduct.stock} onChange={e => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value, 10) })} />
              </label>
              <button type="submit">Update</button>
              <button onClick={() => setEditingProductId(null)}>Cancel</button>
            </form>
          ) : (
            <>
              <button onClick={() => { setEditingProductId(product.id); setEditingProduct(product); }}>Edit</button>
              <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
            </>
            
            
          )}
        </div>
      ))}
  </div>
      <h2>Add Product</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={e => { e.preventDefault(); handleAddProduct(addingProduct); }}>
          <label>
          Name:
          <input value={addingProduct.name} onChange={e => setAddingProduct({ ...addingProduct, name: e.target.value })} />
        </label>
        <label>
          Description:
          <input value={addingProduct.description} onChange={e => setAddingProduct({ ...addingProduct, description: e.target.value })} />
        </label>
        <label>
          Price:
          <input type="number" value={addingProduct.price} onChange={e => setAddingProduct({ ...addingProduct, price: parseFloat(e.target.value) })} />
        </label>
        <label>
          Stock:
          <input type="number" value={addingProduct.stock} onChange={e => setAddingProduct({ ...addingProduct, stock: parseInt(e.target.value, 10) })} />
        </label>
          <label>
            Category:
            <select value={addingProduct.categoryId} onChange={e => setAddingProduct({ ...addingProduct, categoryId: e.target.value })}>
              <option value="">Select a category</option>
              {categories && categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <button type="submit">Add</button>
        </form>
      )}

      <h2>Orders</h2>
      {orders.map(order => (
        <div key={order.id}>
          <h3>Order {order.id}</h3>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}

export default withAuthentication(AdminPage);