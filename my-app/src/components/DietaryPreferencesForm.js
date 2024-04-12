// DietaryPreferencesForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DietaryPreferencesForm.css';


const DietaryPreferencesForm = ({ onSave }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [allergy, setAllergy] = useState('');
    const [cuisine, setCuisine] = useState('');

    useEffect(() => {
        // If the component receives dietary preferences as state, prefill the form
        if (location.state?.dietaryPreferences) {
          setAllergy(location.state.dietaryPreferences.allergy || '');
          setCuisine(location.state.dietaryPreferences.cuisine || '');
        }
      }, [location.state]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave({ allergy, cuisine });
        if (window.alert('Your preferences are saved!')) {
          navigate('/profile');
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
