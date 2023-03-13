import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home/Home";
import Predictor from "./pages/PredictorPage/Predictor";
import Navbar from "./components/nav/Navbar";
import OverallRank from "./pages/overallRank/OverallRank";
import Profile from "./pages/profilePage/Profile";
import Footer from "./components/footer/Footer";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "swiper/css/navigation";
import "swiper/css";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predictor" element={<Predictor />} />
        <Route path="/overallrank" element={<OverallRank />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
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
