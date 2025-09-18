import React from "react";
import './Progress.css';

function ProgressBar({ percent, label }) {
  return (
    <div className="progress-wrapper">
      <div className="progress-label">{label}</div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percent}%` }} 
        />
      </div>
    </div>
  );
}

export default ProgressBar;
