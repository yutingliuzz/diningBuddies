import React from "react";

function Profile() {
  // Use inline styles to set the minimum height to the full viewport height
  const style = {
    backgroundColor: "#393939", // Or any color you want
    minHeight: "100vh", // This makes the div at least as tall as the viewport
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={style}>
      <h1>Profile</h1>
      {/* Rest of your content */}
    </div>
  );
}

export default Profile;
