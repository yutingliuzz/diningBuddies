import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Friends from "./components/Friends";
import Profile from "./components/Profile";
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebaseConfig';
import 'firebase/auth'; 

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate replace to="/public" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
