import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Home from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import Predictor from "./screens/PredictorScreen";
import OverallRank from "./screens/OverAllRankScreen";
import ComparisonScreen from "./screens/ComparisonScreen";
import Profile from "./screens/ProfileScreen";
import Footer from "./components/Footer";
import NotFound from "./screens/NotFound";

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
    <GoogleOAuthProvider clientId="597753245400-qld3s26u0qcjfmtu1lmgks86o5su8fqt.apps.googleusercontent.com">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/predictor" element={<Predictor />} exact />
          <Route
            path="/predictor/overallrank"
            element={userInfo ? <OverallRank /> : <Navigate to="/" exact />}
          />
          <Route
            path="/predictor/predictor-main/comparison"
            element={<ComparisonScreen />}
            exact
          />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="*" element={<NotFound />} />
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
    </GoogleOAuthProvider>
  );
};

export default App;
