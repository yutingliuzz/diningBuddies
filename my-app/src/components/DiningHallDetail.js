import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { AuthContext } from "../context/AuthContext"; // Make sure this path matches your AuthContext location
import "./DiningHallDetail.css";

const DiningHallDetail = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const { currentUser } = useContext(AuthContext);
  const [userAvatars, setUserAvatars] = useState([]);
  const [menu, setMenu] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Fetching dining hall details
    const fetchDiningHallDetails = async () => {
      const response = await fetch(
        `http://localhost:3001/DiningHallDetail/${decodedName}`
      );
      if (!response.ok) {
        console.error("Failed to fetch dining hall details");
        return;
      }
      const data = await response.json();
      setMenu(data.menu);
      setDescription(data.description);
    };

    fetchDiningHallDetails();
    fetchUsersForDiningHall();
  }, [decodedName]);

  const fetchUsersForDiningHall = async () => {
    const response = await fetch(
      `http://localhost:3001/getUsersForDiningHall/${decodedName}`
    );
    const userDetails = await response.json();
    setUserAvatars(userDetails);
  };

  const handleJoin = async () => {
    console.log(currentUser);
    if (!currentUser) {
      alert("Please sign in to join the dining hall.");
      return;
    }
    await fetch("http://localhost:3001/joinDiningHall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser.uid,
        diningHallName: decodedName,
      }),
    });
    fetchUsersForDiningHall(); // Refresh the list of users
  };

  const handleLeave = async () => {
    if (!currentUser) {
      alert("Please sign in to leave the dining hall.");
      return;
    }
    await fetch("http://localhost:3001/leaveDiningHall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser.uid,
        diningHallName: decodedName,
      }),
    });
    fetchUsersForDiningHall(); // Refresh the list of users
  };

  return (
    <div className="detail-container">
      <header className="detail-header">
        <h1 className="detail-title">{decodedName}</h1>
      </header>
      <Stack direction="row" className="button-stack">
        <Button
          variant="contained"
          onClick={handleJoin}
          sx={{
            fontSize: "16px",
            borderRadius: "20px",
            fontWeight: "bold",
            padding: "10px 24px",
            backgroundColor: "#FFAC4B",
            "&:hover": { backgroundColor: "#FFAC4B" },
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Join
        </Button>
        <Button
          variant="outlined"
          onClick={handleLeave}
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "20px",
            padding: "10px 24px",
            color: "#FFAC4B",
            borderColor: "#FFAC4B",
            "&:hover": { borderColor: "#FFAC4B" },
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Leave
        </Button>
      </Stack>
      <section className="detail-content">
        <h2>Featured Menu</h2>
        <p>{menu}</p>
        <h3>Opening Hours</h3>
        <p>{description}</p>
        <h3>Find Your Friends</h3>
        <AvatarGroup max={5}>
          {userAvatars.map((user) => (
            <Avatar
              key={user.uid}
              alt={user.displayName}
              src={user.photoURL || "defaultAvatarUrl"}
            />
          ))}
        </AvatarGroup>
      </section>
    </div>
  );
};

export default DiningHallDetail;
