import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { currentUser, signInWithGoogle, handleSignOut} = useContext(AuthContext)
  const [user, setUser] = useState(currentUser)
  return (
    <div className="profile-page">
      <div className="content-container">
        {user ? (
          <>
            <div className="header">
              <div className="avatar-container">
                <div
                  className="avatar"
                  style={{
                    backgroundImage: `url(${
                      user.photoURL || "defaultAvatarUrl"
                    })`,
                  }}
                ></div>
                <h1>{user.displayName}</h1>
              </div>
            </div>
            <div className="menu">
              <button className="menu-item">My Account</button>
              <button className="menu-item">Privacy</button>
              <button onClick={handleSignOut} className="sign-out">
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <div className="sign-in-container">
            <button onClick={signInWithGoogle} className="google-sign-in">
              Sign In with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
