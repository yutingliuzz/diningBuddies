import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Friends from "./components/Friends";
import Profile from "./components/Profile";
import { AuthProvider } from "./context/AuthContext";
import Chat from './components/Chat';
// import { initializeApp } from "firebase/app";
// import firebaseConfig from './firebaseConfig';
// import {getAuth} from 'firebase/auth'; 
// // import firebase from 'firebase/app';
// import { getFirestore } from "firebase/firestore";
// import { useAuthState } from 'react-firebase-hooks/auth';

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const firestore = getFirestore(app);

function App() {
  //User log in information
  // const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
    <AuthProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate replace to="/public" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/chat" element={<Chat user={user} firestore={firestore}/>} /> */}
        {/* <Route path="/chat" element={<Chat />} />  */}
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
