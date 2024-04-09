import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProducts } from '../Services/api';
import { CartContext } from '../CartContext';
import defaultImage from './default_img.jpg';

function Products() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('price');
  const { state, dispatch } = useContext(CartContext);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      getProducts(categoryId).then(products => {
        setProducts(products);
      });
    } else {
      getProducts().then(products => {
        setProducts(products);
      });
    }
  }, [categoryId]);

  useEffect(() => {
    const sortedProducts = [...products];
    switch (sortOption) {
      case 'price':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'averageRating':
        sortedProducts.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'stock':
        sortedProducts.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  }, [sortOption]);

  const addToCart = product => {
    dispatch({ type: 'ADD_ITEM', item: { ...product, quantity: 1 } });
  };

  return (
    <>
      <Link className="ViewCart" to="/cart">View Cart ({state.length})</Link>
      <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
        <option value="price">Sort by Price</option>
        <option value="averageRating">Sort by Average Rating</option>
        <option value="stock">Sort by Stock</option>
      </select>
      <div className="Products">
        {products.map(product => (
          <div key={product.id} className="Product">
            <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
            <img src={defaultImage} alt={product.name} /> {/* Use the imported image */}
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Average Rating: {product.averageRating}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;