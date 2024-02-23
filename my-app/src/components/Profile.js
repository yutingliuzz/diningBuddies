import React, { useState } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebaseConfig from '../firebaseConfig';
import "./Profile.css";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Profile = () => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleSignOut = () => {
    // Second confirmation step
    if (window.confirm("Are you sure you want to sign out?")) {
      signOut(auth).then(() => {
        setUser(null);
      }).catch((error) => {
        console.error(error.message);
      });
    }
  };

  return (
    <div className="profile-page">
      {user ? (
        <>
          <div className="header">
            <div className="avatar-container">
              <div className="avatar" style={{ backgroundImage: `url(${user.photoURL || 'defaultAvatarUrl'})` }}></div>
              <h1>{user.displayName}</h1>
            </div>
          </div>
          <div className="menu">
            <button className="menu-item">My Account</button>
            <button className="menu-item">Privacy</button>
            <button onClick={handleSignOut} className="sign-out">Sign Out</button>
          </div>
        </>
      ) : (
        // Wrapped the sign-in button in a container for centering
        <div className="sign-in-container">
          <button onClick={signInWithGoogle} className="google-sign-in">
            Sign In with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
