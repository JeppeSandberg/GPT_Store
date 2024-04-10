import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, addRating, getRatings } from '../Services/api';
import { CartContext } from '../CartContext';
import { UserContext } from '../UserContext';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState(1);
  const [averageRating, setAverageRating] = useState('No ratings yet');
  const { productId } = useParams();
  const { dispatch, state } = useContext(CartContext);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    getProduct(productId).then(response => {
      setProduct(response.data);
    });
    getRatings(productId).then(response => {
      setRatings(response);
    });
  }, [productId]);
  
  useEffect(() => {
    if (Array.isArray(ratings) && ratings.length > 0) {
      const average = ratings.reduce((sum, rating) => sum + Number(rating.rating), 0) / ratings.length;
      setAverageRating(average.toFixed(2));
    }
  }, [ratings]);

  const addToCart = product => {
    dispatch({ type: 'ADD_ITEM', item: { ...product, quantity: 1 } });
  };

  const handleAddRating = () => {
    addRating(productId, newRating, userId).then(response => {
      const newRating = {
        userId: userId,
        productId: productId,
        rating: newRating
      };
      if (Array.isArray(ratings)) {
        setRatings([...ratings, newRating]);
      } else {
        setRatings([newRating]);
      }
    });
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
      <p>Average rating: {averageRating}</p>
      <button onClick={() => addToCart(product)}>Add to cart</button>
      <Link to="/cart">View Cart ({state.length})</Link>
      <Link to="/">Home</Link>
      <select value={newRating} onChange={e => setNewRating(e.target.value)}>
        {[1, 2, 3, 4, 5].map(rating => (
          <option key={rating} value={rating}>{rating}</option>
        ))}
      </select>
      <button onClick={handleAddRating}>Submit Rating</button>
    </div>
  );
}

export default ProductDetails;