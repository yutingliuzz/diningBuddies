// DiningHallDetail.js

import React from "react";
import { useParams } from "react-router-dom";
import "./DiningHallDetail.css"; // Make sure to create this CSS file

const DiningHallDetail = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);

  return (
    <div className="detail-container">
      <header className="detail-header">
        <h1 className="detail-title">{decodedName}</h1>
      </header>
      <section className="detail-content">
        <h2>Featured Menu</h2>
        <p>Pho, Fried Rice</p>
        <h3>Recommended Dining Hall</h3>
        <p>E. Bronson Ingram College</p>
      </section>
    </div>
  );
};

export default DiningHallDetail;
