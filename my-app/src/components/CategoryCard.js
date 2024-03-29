import React from "react";
import "./CategoryCard.css"; // Make sure you have corresponding CSS
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ id, name, imageUrl, color, description, menu }) => {
  const navigate = useNavigate();

  // Call this function when the 'View More' button is clicked
  const handleViewMore = () => {
    navigate(`/dining-halls/${encodeURIComponent(name)}`);
  };

  // Use inline styling to set the background color dynamically
  const cardStyle = {
    backgroundColor: color, // This will be the color passed as a prop
  };

  return (
    <div className="category-card" style={cardStyle}>
      <img src={imageUrl} alt={name} className="category-card-img" />
      <div className="category-info">
        <h3>{name}</h3>
        <Button
          sx={{
            color: "#393939",
            fontFamily: "Montserrat, sans-serif",
          }}
          onClick={handleViewMore}
        >
          View More
        </Button>
      </div>
    </div>
  );
};

export default CategoryCard;
