import React, { useEffect, useState } from 'react';
import { getProducts } from './Services/api';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(response => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <img src={product.image} alt={product.name} />
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;