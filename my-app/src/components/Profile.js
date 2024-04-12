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
  const editDietaryPreferences = () => {
    navigate("/dietary-preferences", { state: { dietaryPreferences } });
  };
  const handleSavePreferences = async (preferences) => {
    if (!currentUser) {
      console.error("No user signed in!");
      return;
    }

    try {
      const userRef = doc(db, "Users", currentUser.uid);
      await setDoc(
        userRef,
        { dietaryRestrictions: preferences },
        { merge: true }
      );
      console.log("Dietary preferences saved successfully!");

      // Re-fetch dietary preferences to update local state
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setDietaryPreferences(docSnap.data().dietaryRestrictions);
      }
    } catch (error) {
      console.error("Error saving dietary preferences:", error);
    }
  };
  useEffect(() => {
    const fetchDietaryPreferences = async () => {
      if (currentUser) {
        const userRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setDietaryPreferences(docSnap.data().dietaryRestrictions);
        } else {
          // doc.data() will be undefined in this case
          console.log("No dietary preferences found!");
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
                    backgroundImage: `url(${
                      currentUser.photoURL || "defaultAvatarUrl"
                    })`,
                  }}
                ></div>
                <h1>{currentUser.displayName}</h1>
              </div>
            </div>
            {dietaryPreferences && (
              <div className="dietary-info">
                <p>
                  <strong>Allergies:</strong> {dietaryPreferences.allergy}
                </p>
                <p>
                  <strong>Preferred Cuisine:</strong>{" "}
                  {dietaryPreferences.cuisine}
                </p>
              </div>
            )}
            <div className="menu">
              <button className="menu-item">My Account</button>
              <button className="menu-item" onClick={editDietaryPreferences}>
                Dietary Preferences
              </button>
              <button className="menu-item">Privacy</button>
              <button onClick={handleSignOut} className="sign-out">
                Sign Out
              </button>
            </div>
            <DietaryPreferencesForm onSave={handleSavePreferences} />
            {currentUser.dietaryRestrictions && (
              <div className="dietary-restrictions-display">
                <p>
                  <strong>Allergies:</strong>{" "}
                  {currentUser.dietaryRestrictions.allergy}
                </p>
                <p>
                  <strong>Preferred Cuisine:</strong>{" "}
                  {currentUser.dietaryRestrictions.cuisine}
                </p>
              </div>
            )}
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
