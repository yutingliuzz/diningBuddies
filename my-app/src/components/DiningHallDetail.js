import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "./DiningHallDetail.css"; // Make sure to create this CSS file

const DiningHallDetail = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const [users, setUsers] = useState([]); // State to store fetched users

  // Fetch users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/getUsers"); // Adjust URL as needed
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="detail-container">
        <header className="detail-header">
          <h1 className="detail-title">{decodedName}</h1>
        </header>
        <Stack direction="row" className="button-stack">
          <Button
            variant="outlined"
            sx={{
              fontSize: "16px", // Change font size
              borderRadius: "20px",
              fontWeight: "bold", // Change font weight
              padding: "10px 24px", // Change size by adjusting padding
              color: "#FFAC4B",
              borderColor: "#FFAC4B",
              // Custom color
              "&:hover": {
                borderColor: "#FFAC4B", // Custom hover color
              },

              fontFamily: "Montserrat, sans-serif", // Custom font family
            }}
          >
            Join
          </Button>
          <Button
            variant="outlined"
            sx={{
              fontSize: "16px", // Same changes for consistency
              fontWeight: "bold",
              borderRadius: "20px",
              padding: "10px 24px",
              color: "#393939", // Text color for outlined button
              borderColor: "#393939", // Border color
              "&:hover": {
                borderColor: "#393939",
              },
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Leave
          </Button>
        </Stack>
        <section className="detail-content">
          <h2>Featured Menu</h2>
          <p>Pho, Fried Rice</p>
          <h3>Recommended Dining Hall</h3>
          <p>E. Bronson Ingram College</p>
          <h3>Find Your Friends</h3>
          <AvatarGroup max={5}>
            {users.map((user) => (
              <Avatar key={user.name} alt={user.name} src={user.photoURL} />
            ))}
          </AvatarGroup>
        </section>
      </div>
    </div>
  );
};

export default DiningHallDetail;

// import React, { useState, useEffect } from "react";
// import { useParams, useContext } from "react-router-dom";
// import Avatar from "@mui/material/Avatar";
// import AvatarGroup from "@mui/material/AvatarGroup";
// import Button from "@mui/material/Button";
// import { AuthContext } from "../context/AuthContext"; // Import AuthContext to access currentUser

// const DiningHallDetail = () => {
//   const { name } = useParams();
//   const decodedName = decodeURIComponent(name);
//   const { currentUser } = useContext(AuthContext); // Use currentUser from context
//   const [users, setUsers] = useState([]);

//   // Adjust useEffect to fetch users specifically joined in this dining hall
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3001/getUsersForDiningHall/${decodedName}`
//         );
//         const userIds = await response.json();
//         // Optionally, fetch detailed user info based on these userIds
//         setUsers(userIds);
//       } catch (error) {
//         console.error("Failed to fetch users:", error);
//       }
//     };

//     fetchUsers();
//   }, [decodedName]);

//   const handleJoin = async () => {
//     // Implement join functionality here
//     // Use currentUser.uid for userId and decodedName for diningHallName
//   };

//   const handleLeave = async () => {
//     // Implement leave functionality here
//     // Similar to handleJoin, but for leaving
//   };

//   return (
//     <div>
//       <div className="detail-container">
//         {/* UI Components */}
//         <Button onClick={handleJoin}>Join</Button>
//         <Button onClick={handleLeave}>Leave</Button>
//         {/* Render Avatars */}
//       </div>
//     </div>
//   );
// };

// export default DiningHallDetail;
