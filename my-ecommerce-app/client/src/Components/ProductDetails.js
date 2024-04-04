import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../Services/api';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    getProduct(productId).then(response => {
      setProduct(response.data);
    });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ProductDetails">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
}

export default ProductDetails;