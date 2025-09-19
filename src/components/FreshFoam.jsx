import React from "react";
import "./FreshFoam.css";

const FreshFoam = () => {
  return (
    <div className="container-fluid p-0 mb-5">
      <div className="freshfoam-hero d-flex align-items-center justify-content-start">
        <div className="ms-5 text-start text-white">
          <h1 className="display-4 fw-bold">The 574</h1>
          <p className="lead">Worn by anyone.</p>
          <div className="d-flex gap-3">
            <button className="btn btn-danger px-4 py-2">Shop adults</button>
            <button className="btn btn-danger px-4 py-2">Shop kids</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreshFoam;
