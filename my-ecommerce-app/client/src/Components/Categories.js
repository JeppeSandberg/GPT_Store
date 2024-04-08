import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../Services/api';

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data);
    });
  }, []);

  return (
    <div className="Categories">
      {categories.map(category => (
        <Link key={category.id} to={`/categories/${category.id}`}>
          {category.name}
        </Link>
      ))}
    </div>
  );
}

export default Categories;