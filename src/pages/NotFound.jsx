import React from 'react';
import { useNavigate } from 'react-router';
import { FaHouse, FaArrowLeft, FaTriangleExclamation } from "react-icons/fa6";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="text-center" style={{ maxWidth: '500px' }}>
        {/* Animated Icon Section */}
        <div className="mb-4 position-relative d-inline-block">
          <div 
            className="position-absolute top-50 start-50 translate-middle opacity-10"
            style={{ width: '200px', height: '200px', backgroundColor: 'var(--accent-blue)', borderRadius: '50%', filter: 'blur(40px)' }}
          ></div>
          <h1 
            className="display-1 fw-black mb-0 position-relative" 
            style={{ color: 'var(--accent-blue)', letterSpacing: '-5px', fontSize: '8rem' }}
          >
            404
          </h1>
        </div>

        {/* Text Content */}
        <h2 className="fw-bold text-dark mb-3">Classroom Not Found</h2>
        <p className="text-muted mb-5 px-lg-5">
          It looks like you've wandered into an empty hallway. The page you are looking for doesn't exist or has been moved to another wing.
        </p>

        {/* Action Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="btn btn-primary px-4 py-3 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 border-0"
            style={{ backgroundColor: 'var(--accent-blue)' }}
          >
            <FaHouse /> Back to Dashboard
          </button>
          
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-outline-secondary px-4 py-3 fw-bold rounded-3 d-flex align-items-center justify-content-center gap-2 border-2"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>

        {/* Subtle Footer Note */}
        <div className="mt-5 pt-4 border-top border-secondary-subtle">
          <p className="small text-muted d-flex align-items-center justify-content-center gap-2">
            <FaTriangleExclamation className="text-warning" /> 
            If you think this is a mistake, please contact the IT Administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;