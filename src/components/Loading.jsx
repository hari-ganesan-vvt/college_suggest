import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loader_container">
      <BeatLoader color="#129875" size={16} />
    </div>
  );
};

export default Loading;
