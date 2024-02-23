import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./Home.css";
import CategoryCard from "./CategoryCard"; // Ensure this path is correct
import backgroundImage from "../background.jpg";

function Home() {
  // State to store dining halls data from Firestore
  const [diningHalls, setDiningHalls] = useState([]);

  // Firestore database instance
  const db = getFirestore();

  // Fetch dining hall data from Firestore when the component mounts
  useEffect(() => {
    const fetchDiningHalls = async () => {
      const querySnapshot = await getDocs(collection(db, "DiningHalls"));
      const halls = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDiningHalls(halls);
    };

    fetchDiningHalls().catch(console.error);
  }, [db]); // Empty array ensures this only runs once when the component mounts

  return (
    <div
      className="Home"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="Home-header">
        <h1>Dining Hall</h1>
      </div>
      <main className="Home-main">
        {/* Render a CategoryCard for each dining hall fetched from Firestore */}
        {diningHalls.map((hall) => (
          <CategoryCard
            key={hall.id}
            name={hall.name}
            imageUrl={hall.imageUrl}
            color={hall.color}
            description={hall.description}
            menu={hall.menu}
          />
        ))}
      </main>
    </div>
  );
}

export default Home;
