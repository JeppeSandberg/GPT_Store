import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProducts } from '../Services/api';
import { CartContext } from '../CartContext';

function Products() {
  const [products, setProducts] = useState([]);
  const { state, dispatch } = useContext(CartContext);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      getProducts(categoryId).then(response => {
        setProducts(response.data);
      });
    } else {
      getProducts().then(response => {
        setProducts(response.data);
      });
    }
  }, [categoryId]);

  const addToCart = product => {
    dispatch({ type: 'ADD_ITEM', item: { ...product, quantity: 1 } });
  };

  return (
    <div className="Products">
      <Link to="/cart">View Cart ({state.length})</Link>
      {products.map(product => (
        <div key={product.id} className="Product">
          <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
          <img src={product.image} alt={product.name} />
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
}

export default Products;