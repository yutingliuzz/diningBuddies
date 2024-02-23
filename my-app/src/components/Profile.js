import React, { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseConfig from '../firebaseConfig';
import "./Profile.css";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Optionally, create or update the user document in Firestore
        const userRef = doc(db, "Users", user.uid);
        setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }, { merge: true });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Clean up subscription
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // setUser(result.user); // This line is now handled by onAuthStateChanged
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      signOut(auth).then(() => {
        // setUser(null); // This line is now handled by onAuthStateChanged
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
