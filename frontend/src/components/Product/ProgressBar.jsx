// src/ProgressBar.js
import React from "react";
import "../../css/product.css";

const ProgressBar = ({ value }) => {
  return (
    <div className="progress-container">
      <progress value={value} max="1"></progress>
      <div className="progress-bar-steps">
        <div className="step">
          <span className="step-label">STEP 1</span>
          <span className="step-description">Gift Packaging</span>
        </div>
        <div className="step">
          <span className="step-label">STEP 2</span>
          <span className="step-description">Select Gift Items</span>
        </div>
        <div className="step">
          <span className="step-label">STEP 3</span>
          <span className="step-description">Select A Card</span>
        </div>
        <div className="step">
          <span className="step-label">STEP 4</span>
          <span className="step-description">Message On Card</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
