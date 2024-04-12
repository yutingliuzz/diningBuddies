import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // if using react-router v6
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import "./Friends.css";

const Friends = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate(); // Hook to navigate to different routes

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3001/getUsers");
      if (!response.ok) {
        console.error("Failed to fetch users");
        return;
      }
      const usersList = await response.json();
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleUserClick = (userId) => {
    console.log(userId);
    // Navigate to chat with the selected user
    navigate(`/chat`);
  };

  return (
    <div className="friends-container">
      <header className="chat-list-header">
        <h1>Chats</h1>
      </header>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "90%",
            paddingLeft: "10px",
            borderRadius: "5px",
          }, // Modify this line to full width
        }}
        noValidate
        autoComplete="off"
      >
        {/* Update the TextField to look more like a search bar */}
        <TextField
          style={{ fontFamily: "Montserrat, sans-serif" }}
          id="search-bar"
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            style: {
              // Apply styles directly to the input element
              borderRadius: "20px", // For rounded corners
              fontFamily: "Montserrat, sans-serif", // For font family
            },
          }}
          InputLabelProps={{
            style: {
              fontFamily: "Montserrat, sans-serif",
              paddingLeft: "10px",
            }, // Apply your font family to the label
          }}
        />
      </Box>
      <List className="friends-list">
        {filteredUsers.map((user) => (
          <ListItem
            key={user.uid}
            button
            onClick={() => handleUserClick(user.uid)}
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <ListItemAvatar>
              <Avatar src={user.photoURL} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              sx={{
                "& .MuiTypography-root": {
                  fontFamily: "Montserrat, sans-serif",
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Friends;
