import React from "react";
import useMobileView from "../hooks/useMobileView";

const Profile = () => {
  //custom hook
  const isMobile = useMobileView();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Profile</h1>
      <h1> Screen View: {JSON.stringify(isMobile)}</h1>
    </div>
  );
};

export default Profile;
