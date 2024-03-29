import React from "react";
import "./Friends.css";
import Search from "./Search.js";
import Chats from "./Chats.js";

const Friends = () => {
  return (
    <div className="Friends">
      <h1>Hi</h1>
      <Search/>
      <Chats/>
    </div>
  );
};
export default Friends;

// const friends = [
//   // This would be fetched from your backend; using static data for now
//   { id: 1, name: "Cora Chen", email: "friend1@example.com" },
//   { id: 2, name: "Rosa Liu", email: "friend2@example.com" },
//   { id: 3, name: "Yuting Liu", email: "friend3@example.com" },
//   // Add as many friends as you want here
// ];

// const Friends = () => {
//   return (
//     <div className="friend-list">
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
