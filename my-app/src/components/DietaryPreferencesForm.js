// DietaryPreferencesForm.js
import React, { useState, useEffect,useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./DietaryPreferencesForm.css";
import { db } from "../firebaseConfig.js";
import { AuthContext } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";

const DietaryPreferencesForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allergy, setAllergy] = useState("");
  const [cuisine, setCuisine] = useState("");
  const { currentUser} =
  useContext(AuthContext);

  useEffect(() => {
    // If the component receives dietary preferences as state, prefill the form
    if (location.state?.dietaryPreferences) {
      setAllergy(location.state.dietaryPreferences.allergy || "");
      setCuisine(location.state.dietaryPreferences.cuisine || "");
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {allergy, cuisine}
      const userRef = doc(db, "Users", currentUser.uid);
      await setDoc(userRef, { dietaryRestrictions: data }, { merge: true });
      alert("Preferences saved successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error saving preferences: ", error);
      alert("Failed to save preferences.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Dietary Restrictions & Allergies:
        <input
          type="text"
          value={allergy}
          onChange={(e) => setAllergy(e.target.value)}
        />
      </label>
      <label>
        Preferred Cuisine:
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="italian">Italian</option>
          <option value="chinese">Chinese</option>
          <option value="mexican">Indian</option>
          <option value="mexican">Korean</option>
          <option value="mexican">American</option>
          <option value="indian">Mexican</option>
        </select>
      </label>
      <button type="submit">Save Preferences</button>
    </form>
  );
};

export default DietaryPreferencesForm;
