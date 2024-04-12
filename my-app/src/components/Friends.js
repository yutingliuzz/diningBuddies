// import React from "react";
// import "./Friends.css";

// const friends = [
//   // This would be fetched from your backend; using static data for now
//   { id: 1, name: "Cora Chen", email: "friend1@example.com" },
//   { id: 2, name: "Rosa Liu", email: "friend2@example.com" },
//   { id: 3, name: "Yuting Liu", email: "friend3@example.com" },
//   // Add as many friends as you want here
// ];

// const Friends = () => {
//   return (
//     <div className="friend-list" style={{ backgroundColor: "white" }}>
//       <h1>Friends</h1>
//       {friends.map((friend) => (
//         <div key={friend.id} className="friend-item">
//           <img
//             src={`https://i.pravatar.cc/150?img=${friend.id}`}
//             alt={friend.name}
//             className="friend-avatar"
//           />
//           <div className="friend-info">
//             <h2>{friend.name}</h2>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Friends;

// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Friends = ({ messages, sendMessage }) => {
//   const [newMessage, setNewMessage] = useState("");
//   const { currentUser } = useContext(AuthContext);

//   const handleSendMessage = () => {
//     sendMessage(newMessage);
//     setNewMessage(""); // Clear the input after sending
//   };

//   const handleInputChange = (e) => {
//     setNewMessage(e.target.value);
//   };

//   const handleKeyPress = (e) => {
//     // Send message when Enter key is pressed
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.sender === currentUser.uid ? "sent" : "received"
//             }`}
//           >
//             <div className="message-content">{msg.text}</div>
//             <div className="message-timestamp">
//               {/* Format and display the timestamp */}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="chat-input-container">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={handleInputChange}
//           onKeyPress={handleKeyPress}
//           placeholder="Type a message..."
//           className="chat-input"
//         />
//         <button onClick={handleSendMessage} className="chat-send-button">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Friends;

// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
// import InputAdornment from "@mui/material/InputAdornment";
// import "./Friends.css"; // Ensure you create this CSS file and import here

// const Friends = ({ stories, chats, onNewChat }) => {
//   const [searchText, setSearchText] = useState("");
//   return (
//     <div className="chat-list-container">
//       <header className="chat-list-header">
//         <h1>Chats</h1>
//       </header>

//       <Box
//         component="form"
//         sx={{
//           "& > :not(style)": {
//             m: 1,
//             width: "90%",
//             paddingLeft: "10px",
//             borderRadius: "5px",
//           }, // Modify this line to full width
//         }}
//         noValidate
//         autoComplete="off"
//       >
//         {/* Update the TextField to look more like a search bar */}
//         <TextField
//           style={{ fontFamily: "Montserrat, sans-serif" }}
//           id="search-bar"
//           label="Search"
//           variant="outlined"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton>
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//             style: {
//               // Apply styles directly to the input element
//               borderRadius: "20px", // For rounded corners
//               fontFamily: "Montserrat, sans-serif", // For font family
//             },
//           }}
//           InputLabelProps={{
//             style: {
//               fontFamily: "Montserrat, sans-serif",
//               paddingLeft: "10px",
//             }, // Apply your font family to the label
//           }}
//         />
//       </Box>

//       <button className="new-chat-button" onClick={onNewChat}>
//         + New Chat
//       </button>
//     </div>
//   );
// };

// export default Friends;

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

  const handleUserClick = (userId) => {
    // Navigate to chat with the selected user
    navigate(`/chat/${userId}`);
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
        {users.map((user) => (
          <ListItem
            key={user.id}
            button
            onClick={() => handleUserClick(user.id)}
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
