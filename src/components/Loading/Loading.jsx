import React from "react";
import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loader_container">
      <SyncLoader color="#129875" size={14} />
    </div>
  );
};

export default Loading;
