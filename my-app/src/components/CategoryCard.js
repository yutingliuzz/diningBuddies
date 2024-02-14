// import React from "react";
// import "./CategoryCard.css"; // assume you have corresponding CSS

// const CategoryCard = ({ name, price, imageUrl }) => {
//   return (
//     <div className="category-card">
//       <img src={imageUrl} alt={name} className="category-card img" />
//       <div className="category-info">
//         <h3>{name}</h3>
//         <p>{price}</p>
//       </div>
//     </div>
//   );
// };

// export default CategoryCard;

import React from "react";
import "./CategoryCard.css"; // Make sure you have corresponding CSS

const CategoryCard = ({ name, price, imageUrl, color }) => {
  // Use inline styling to set the background color dynamically
  const cardStyle = {
    backgroundColor: color, // This will be the color passed as a prop
  };

  return (
    <div className="category-card" style={cardStyle}>
      <img src={imageUrl} alt={name} className="category-card-img" />
      <div className="category-info">
        <h3>{name}</h3>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
