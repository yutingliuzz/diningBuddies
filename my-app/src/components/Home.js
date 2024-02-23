// import React from "react";
// import "./Home.css";
// import CategoryCard from "./CategoryCard"; // Ensure this path is correct
// import backgroundImage from "../background.jpg";

// function Home() {
//   // Define your categories data
//   const categories = [
//     { name: "EBI", price: 6, imageUrl: "/ebilogo.jpg", color: "#FDEBC9" },
//     { name: "Rand", price: 12, imageUrl: "/randlogo.jpg", color: "#F5D4C1" },
//     {
//       name: "Commons",
//       price: 9,
//       imageUrl: "/commonslogo.jpg",
//       color: "#C9EAFD",
//     },
//     {
//       name: "Rothchild",
//       price: 10,
//       imageUrl: "/rothschildlogo.jpg",
//       color: "#FDC9D2",
//     },
//     {
//       name: "Kissam",
//       price: 10,
//       imageUrl: "/kissamlogo.jpg",
//       color: "#D0F1EB",
//     },
//     {
//       name: "Pub",
//       price: 10,
//       imageUrl: "/publogo.jpg",
//       color: "#DED2F9",
//     },
//   ];

//   return (
//     <div
//       className="Home"
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Add a container for the title to separate it from the grid */}
//       <div className="Home-header">
//         <h1>Dining Hall</h1>
//       </div>
//       <main className="Home-main">
//         {/* Here we map over the categories and render a CategoryCard for each */}
//         {categories.map((category, index) => (
//           <CategoryCard
//             key={index}
//             name={category.name}
//             price={category.price}
//             imageUrl={category.imageUrl}
//             color={category.color}
//           />
//         ))}
//       </main>
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
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
      const halls = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
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
            price={hall.price}
            imageUrl={hall.imageUrl}
            color={hall.color}
          />
        ))}
      </main>
    </div>
  );
}

export default Home;

