import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import SignUp from "../pages/SignUp.jsx";
import Settings from "../pages/Settings.jsx";
import Profile from "../pages/Profile.jsx";
import HomeProtector from "../components/HomeProtector.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

const AllRoutes = () => {
  const { authUser } = useAuthStore();
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <HomeProtector>
              <Home />
            </HomeProtector>
          }
        />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/profile"
          element={
            <HomeProtector>
              <Profile />
            </HomeProtector>
          }
        />
      </Routes>
    </>
  );
};

export default AllRoutes;
