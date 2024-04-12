import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import { AuthContext } from "../context/AuthContext";
import DietaryPreferencesForm from "./DietaryPreferencesForm";
import { db } from "../firebaseConfig.js";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser, signInWithGoogle, handleSignOut } =
    useContext(AuthContext);
  const [currentView, setCurrentView] = useState("profile");
  const navigate = useNavigate();
  const [dietaryPreferences, setDietaryPreferences] = useState(null);
  const navigateToDietaryPreferences = () => {
    navigate("/dietary-preferences", { state: { dietaryPreferences } });
  };


  useEffect(() => {
    console.log(dietaryPreferences);
    const fetchDietaryPreferences = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, "Users", currentUser.uid);
          const docSnap = await getDoc(userRef);
          console.log(docSnap.data())
          if (docSnap.exists()) {
            setDietaryPreferences(docSnap.data().dietaryRestrictions || null);
          }
        } catch (error) {
          console.error("Error fetching dietary preferences:", error);
        }
      }
    };

    fetchDietaryPreferences();
  }, [currentUser]);
  
  return (
    <div className="profile-page">
      <div className="content-container">
        {currentUser ? (
          <>
            <div className="header">
              <div className="avatar-container">
                <div
                  className="avatar"
                  style={{
                    backgroundImage: `url(${currentUser.photoURL || "defaultAvatarUrl"})`,
                  }}
                />
                <h1>{currentUser.displayName}</h1>
                {dietaryPreferences ? (
                  <div className="dietary-info">
                    <p><strong>Allergies:</strong> {dietaryPreferences.allergy}</p>
                    <p><strong>Preferred Cuisine:</strong> {dietaryPreferences.cuisine}</p>
                    <button className="dietary-button" onClick={navigateToDietaryPreferences}>
                    Update Dietary Preferences
                    </button>
                  </div>
                ) : (
                  <button onClick={navigateToDietaryPreferences}>
                    Add Dietary Preferences
                  </button>
                )}
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