import React from "react";
import "./Home.css";
import CategoryCard from "./CategoryCard"; // Ensure this path is correct
import backgroundImage from "../background.jpg";

function Home() {
  // Define your categories data
  const categories = [
    { name: "EBI", price: 6, imageUrl: "/ebilogo.jpg" },
    { name: "Rand", price: 12, imageUrl: "/randlogo.jpg" },
    { name: "Commons", price: 9, imageUrl: "/commonslogo.jpg" },
    { name: "Rothchild", price: 10, imageUrl: "/rothschildlogo.jpg" },
  ];

  return (
    <div
      className="Home"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <main className="Home-main">
        <h1>Dinning Hall</h1>
        {/* Here we map over the categories and render a CategoryCard for each */}
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            name={category.name}
            price={category.price}
            imageUrl={category.imageUrl}
          />
        ))}
      </main>
    </div>
  );
}

export default Home;
