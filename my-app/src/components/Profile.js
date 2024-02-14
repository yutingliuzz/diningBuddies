import React from "react";
import "./Profile.css";

// function Profile() {
//   // Use inline styles to set the minimum height to the full viewport height
//   const style = {
//     backgroundColor: "#393939", // Or any color you want
//     minHeight: "100vh", // This makes the div at least as tall as the viewport
//     display: "flex",
//     flexDirection: "column",
//   };

//   return (
//     <div style={style}>
//       <h1>Profile</h1>
//       {/* Rest of your content */}
//     </div>
//   );
// }

// export default Profile;

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="header">
        <div className="avatar-container">
          <div className="avatar"></div>
          <h1>Jenny W.</h1>
        </div>
      </div>
      <div className="menu">
        <button className="menu-item">My Account</button>
        <button className="menu-item">QR Code</button>
        <button className="menu-item">Privacy</button>
        <button className="sign-out">Sign Out</button>
      </div>
    </div>
  );
};

export default Profile;
