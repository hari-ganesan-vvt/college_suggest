import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import Home from "./screens/HomeScreen";
import Navbar from "./components/nav/Navbar";
import Predictor from "./screens/PredictorScreen";
import OverallRank from "./screens/OverAllRankScreen";
import Profile from "./screens/ProfileScreen";
import Footer from "./components/footer/Footer";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "swiper/css/navigation";
import "swiper/css";
import "./App.css";

const App = () => {
  const userAuth = useSelector((state) => state.userLogin);
  const { userInfo } = userAuth;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predictor" element={<Predictor />} />
        <Route
          path="/predictor/overallrank"
          element={userInfo ? <OverallRank /> : <Navigate to="/" />}
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </BrowserRouter>
  );
};

export default App;
