import React from 'react';
import './Loader.css';

const Loader = () => (
  <div className="loader-container">
    <div className="loader-content">
      {/* Optional: Add your logo here */}
      {/* <img src="/logo.png" alt="Logo" className="loader-logo" /> */}
      <div className="custom-spinner"></div>
      <p className="loader-text">Securing your session...</p>
    </div>
  </div>
);

export default Loader;