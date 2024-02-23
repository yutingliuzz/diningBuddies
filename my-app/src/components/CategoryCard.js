import React, { useState } from "react";
import "./CategoryCard.css"; // Make sure you have corresponding CSS
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const CategoryCard = ({ name, imageUrl, color, description, menu }) => {
  const [open, setOpen] = useState(false); // Add state to manage modal visibility

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Use inline styling to set the background color dynamically
  const cardStyle = {
    backgroundColor: color, // This will be the color passed as a prop
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "#393939",
    boxShadow: 24,
    p: 4,
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
          onClick={handleOpen}
        >
          View More
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ fontFamily: "Montserrat, sans-serif", color: "white" }}
          >
            {name}
          </Typography>
          <Typography
            id="modal-description"
            sx={{ mt: 2, fontFamily: "Montserrat, sans-serif", color: "white" }}
          >
            {description}
          </Typography>
          <Typography
            id="modal-menu"
            sx={{ mt: 2, fontFamily: "Montserrat, sans-serif", color: "white" }}
          >
            {menu}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default CategoryCard;
