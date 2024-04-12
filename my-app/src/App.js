import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Friends from "./components/Friends";
import Profile from "./components/Profile";
import { AuthContextProvider } from "./context/AuthContext";
import DiningHallDetail from "./components/DiningHallDetail";
import Chat from "./components/Chat";
import { DiningHallProvider } from "./context/DiningContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navigation />
        <DiningHallProvider>
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dining-halls/:name" element={<DiningHallDetail />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </DiningHallProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
