import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../Services/api';
import { CartContext } from '../CartContext';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const { dispatch, state } = useContext(CartContext);

  useEffect(() => {
    getProduct(productId).then(response => {
      setProduct(response.data);
    });
  }, [productId]);

  const addToCart = product => {
    dispatch({ type: 'ADD_ITEM', item: { ...product, quantity: 1 } });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ProductDetails">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to cart</button>
      <Link to="/cart">View Cart ({state.length})</Link>
      <Link to="/">Home</Link>
    </div>
  );
}

export default ProductDetails;