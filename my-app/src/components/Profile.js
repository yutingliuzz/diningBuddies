import React from "react";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./Profile.css";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Profile = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // You can store the user info or token in your state or context as needed
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // You might want to show an error message to the user
        console.error(errorMessage);
      });
  };

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
        {/* Add Google Sign-In button */}
        <button onClick={signInWithGoogle} className="menu-item google-sign-in">
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Profile;




/*
import React from "react";
import "./Profile.css";
*/

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

/*
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

*/
