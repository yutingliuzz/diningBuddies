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
import DietaryPreferencesForm from './components/DietaryPreferencesForm';
import { DiningHallProvider } from "./context/DiningContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate replace to="/public" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dining-halls/:name" element={<DiningHallDetail />} />
          <Route path="/dietary-preferences" element={<DietaryPreferencesForm />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
