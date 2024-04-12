import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { AuthContext } from "../context/AuthContext";
import "./DiningHallDetail.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useDiningHall } from "../context/DiningContext";

const DiningHallDetail = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const { currentUser } = useContext(AuthContext);
  const { hasJoined, setHasJoined } = useDiningHall();
  const { joinedHall, setJoinedHall } = useDiningHall();
  const [userAvatars, setUserAvatars] = useState([]);
  const [menu, setMenu] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/home");
  };

  const handleJoin = async () => {
    if (!currentUser) {
      alert("Please sign in to join the dining hall.");
      return;
    }
    if (joinedHall) {
      alert("You are already joined in another dining hall.");
      return;
    }
    const response = await fetch("http://localhost:3001/joinDiningHall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: currentUser.uid,
        diningHallName: decodedName,
      }),
    });
    if (response.ok) {
      setJoinedHall(decodedName); // Set the name of the dining hall joined
    }
    fetchUsersForDiningHall();
  };

  const handleLeave = async () => {
    if (!currentUser || joinedHall !== decodedName) {
      alert("You are not part of this dining hall.");
      return;
    }
    const response = await fetch("http://localhost:3001/leaveDiningHall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: currentUser.uid,
        diningHallName: decodedName,
      }),
    });
    if (response.ok) {
      setJoinedHall(null); // Clear the joined hall
    }
    fetchUsersForDiningHall();
  };

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
      setImageURL(data.imageUrl);
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

  return (
    <div className="detail-container">
      <IconButton
        onClick={handleGoBack}
        sx={{ position: "absolute", left: 16, top: 16 }}
      >
        <ArrowBackIcon />
      </IconButton>
      {imageURL && (
        <img src={imageURL} alt={decodedName} className="dining-hall-image" />
      )}
      <header className="detail-header">
        <h1 className="detail-title">{decodedName}</h1>
      </header>
      <Stack direction="row" className="button-stack">
        {!joinedHall && (
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
              width: "200px",
            }}
          >
            Join
          </Button>
        )}
        {joinedHall === decodedName && (
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
              width: "200px",
            }}
          >
            Leave
          </Button>
        )}
      </Stack>
      <section className="detail-content">
        <h2>Featured Menu</h2>
        <p>{menu}</p>
        <h3>Opening Hours</h3>
        <p>{description}</p>
        <h3>Find Your Friends</h3>
        <AvatarGroup max={3}>
          {userAvatars.map((user) => (
            <Avatar
              key={user.uid}
              alt={user.displayName}
              src={user.photoURL || "defaultAvatarUrl"}
            />
          ))}
        </AvatarGroup>
        {userAvatars.length > 3 && (
          <Button onClick={handleClickOpen} sx={{ mt: 2 }}>
            View More
          </Button>
        )}
      </section>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title">All Friends</DialogTitle>
        <DialogContent>
          {userAvatars.map((user) => (
            <Stack
              key={user.uid}
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ marginBottom: 2 }}
            >
              <Avatar
                alt={user.displayName}
                src={user.photoURL || "defaultAvatarUrl"}
              />
              <Typography variant="body1">{user.displayName}</Typography>
            </Stack>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiningHallDetail;
