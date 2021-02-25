import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "../index.css";

const Loading = () => {
  return (
    <div id="loading" className="d-flex justify-content-center align-items-center">
      
        <Loader
          type="Watch"
          color="#D5F5E3"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      
    </div>
  );
};

export default Loading;
