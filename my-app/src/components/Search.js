import React, { useContext, useState } from "react";

import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebaseConfig";
import { AuthContext } from "../context/AuthContext";


const Search = () => {
     const [username, setUsername] = useState("");
     const [user, setUser] = useState(null);
     const [err, setErr] = useState(false);

     const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  
    const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };


    return(
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
    </div> // Added missing closing div tag
  );
};

export default Search;