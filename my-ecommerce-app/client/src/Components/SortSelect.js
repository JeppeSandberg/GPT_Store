// SortSelect.js
import React from 'react';

function SortSelect({ sortOption, setSortOption }) {
  const handleChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <select value={sortOption} onChange={handleChange}>
      <option value="price">Sort by Price</option>
      <option value="averageRating">Sort by Average Rating</option>
      <option value="stock">Sort by Stock</option>
    </select>
  );
}

export default SortSelect;