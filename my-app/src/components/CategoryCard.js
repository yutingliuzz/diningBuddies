import React from "react";
import "./CategoryCard.css"; // assume you have corresponding CSS

const CategoryCard = ({ name, price, imageUrl }) => {
  return (
    <div className="category-card">
      <img src={imageUrl} alt={name} className="category-card img" />
      <div className="category-info">
        <h3>{name}</h3>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
