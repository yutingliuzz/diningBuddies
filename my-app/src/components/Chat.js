import React from "react";
import "./Chat.css";
import { useRef, useState, useContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatMessage = ({ message, user }) => {
  const { text, uid, photoURL } = message;

  const messageClass = uid === user.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
};

const Chat = () => {
  const dummy = useRef();
  const messagesRef = collection(db, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(25));
  const { currentUser } = useContext(AuthContext);

  const [messages] = useCollectionData(messagesQuery, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = currentUser;

    try {
      await addDoc(messagesRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      });
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  if (!currentUser) {
    return <div>not signed in </div>;
  }
  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} user={currentUser} />
          ))}

        <span ref={dummy}></span>
      </main>

      <form
        onSubmit={sendMessage}
        style={{ width: "90%", paddingLeft: "20px", marginTop: "150%" }}
        className="chat-form"
      >
        <TextField
          fullWidth
          variant="outlined"
          value={formValue}
          style={{ fontFamily: "Montserrat, sans-serif" }}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Say something nice"
          InputProps={{
            endAdornment: (
              <IconButton color="primary" disabled={!formValue} type="submit">
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </form>
    </>
  );
};

export default Chat;

// Chats.js
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   getFirestore,
//   collection,
//   query,
//   orderBy,
//   onSnapshot,
//   addDoc,
// } from "firebase/firestore";

// const Chat = () => {
//   const { userId } = useParams(); // userId of the chat partner
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const db = getFirestore();

//   useEffect(() => {
//     // Define the chat document ID somehow. This is just a placeholder.
//     // In practice, you would likely retrieve it from the URL or state.
//     const chatDocId = "CHAT_DOC_ID";

//     const q = query(
//       collection(db, "Chats", chatDocId, "Messages"),
//       orderBy("timestamp")
//     );
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const fetchedMessages = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setMessages(fetchedMessages);
//     });

//     return unsubscribe;
//   }, [db, userId]);

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     // Again, this is just a placeholder. You would need to define how you get the chatDocId.
//     const chatDocId = "CHAT_DOC_ID";
//     await addDoc(collection(db, "Chats", chatDocId, "Messages"), {
//       text: newMessage,
//       senderId: "CURRENT_USER_ID", // Replace with the current user's ID
//       timestamp: new Date(), // Firestore will convert this to a Timestamp
//     });
//     setNewMessage("");
//   };

//   return (
//     <div className="chat-container">
//       <div className="messages-container">
//         {messages.map((message) => (
//           <p
//             key={message.id}
//             className={
//               message.senderId === "CURRENT_USER_ID" ? "sent" : "received"
//             }
//           >
//             {message.text}
//           </p>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           className="message-input"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button className="send-button" onClick={sendMessage}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

// Chats.js
// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "./Chat.css";

// const Chat = () => {
//   const { userId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [chatDocId, setChatDocId] = useState(null);
//   const { currentUser } = useContext(AuthContext);

//   // Fetch messages for a chat
//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (chatDocId) {
//         const response = await fetch(
//           `http://localhost:3001/chats/${chatDocId}/messages`
//         );
//         const data = await response.json();
//         setMessages(data);
//       }
//     };

//     fetchMessages();
//   }, [chatDocId]);

//   // Get or create chat document ID
//   useEffect(() => {
//     const getOrCreateChat = async () => {
//       const response = await fetch(
//         `http://localhost:3001/getOrCreateChat/${currentUser.uid}/${userId}`
//       );
//       const data = await response.json();
//       setChatDocId(data.chatId);
//     };

//     getOrCreateChat();
//   }, [userId]);

//   // Send message to the chat
//   const sendMessage = async () => {
//     if (newMessage.trim() && chatDocId) {
//       await fetch(`http://localhost:3001/chats/${chatDocId}/messages`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           text: newMessage,
//           senderId: "CURRENT_USER_ID", // Replace with actual sender's ID
//         }),
//       });
//       setNewMessage("");
//       // Optionally, fetch messages again to update UI
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="messages-container">
//         {messages.map((message) => (
//           <p
//             key={message.id}
//             className={
//               message.senderId === "CURRENT_USER_ID" ? "sent" : "received"
//             }
//           >
//             {message.text}
//           </p>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           className="message-input"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button className="send-button" onClick={sendMessage}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
