import React from "react";
import { createContext, useEffect, useState } from "react";
// import { auth } from "../firebaseConfig";
// import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db} from "../firebaseConfig";
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app); // Initialize Firestore

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser)
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
      signOut(auth)
        .then(() => {
          // setUser(null); // This line is now handled by onAuthStateChanged
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };


  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        // Optionally, create or update the user document in Firestore
        const userRef = doc(db, "Users", user.uid);
        setDoc(
          userRef,
          {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          { merge: true }
        );
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe(); // Clean up subscription
  }, []);

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //     console.log(user);
  //   });

  //   return () => {
  //     unsub();
  //   };
  // }, []);

  const value = {currentUser, signInWithGoogle, handleSignOut}

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};