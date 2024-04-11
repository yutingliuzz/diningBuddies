import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Friends from "./components/Friends";
import Profile from "./components/Profile";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import Chats from "./components/Chats";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate replace to="/public" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/friends/*"
            element={
              <ChatContextProvider>
                <Routes>
                  <Route path="/search" element={<Friends />} />
                  <Route path="/Chats" element={<Chats />} />
                </Routes>
              </ChatContextProvider>
            }
          />
          <Route />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
