import React from "react";
import { SyncLoader } from "react-spinners";

const LoadingComponent = () => {
  return (
    <div className="d-flex justify-content-center" style={{margin: "16px 0"}}>
      <SyncLoader color="#000" />
    </div>
  );
};

export default LoadingComponent;
