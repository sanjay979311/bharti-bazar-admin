

import React from 'react';
import { Container, Button, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../features/auth/authApiSlice"; // Adjust path
import { selectCurrentUser } from "../features/auth/authSlice";   // Adjust path

const Unauthorized = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [logout, { isLoading }] = useLogoutMutation();

  // The "Escape Hatch" logic
  const handleLogoutAndSwitch = async () => {
    try {
      await logout().unwrap();
      // After the cookie is cleared, we can safely go to login
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Container 
      fluid 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ backgroundColor: "var(--bg-light)" }}
    >
      <Card 
        className="shadow-sm text-center p-5 border-0" 
        style={{ 
          maxWidth: "500px", 
          borderRadius: "1.25rem",
          backgroundColor: "var(--white)" 
        }}
      >
        <div className="mb-4">
          <i 
            className="fa fa-shield-alt fa-4x" 
            style={{ color: "#ef4444" }}
          ></i>
        </div>

        <h2 className="fw-bold mb-2" style={{ color: "var(--text-main)" }}>
          Access Denied
        </h2>

        {/* User Context Info */}
        <div className="mb-4">
          <p className="text-muted mb-1 small uppercase tracking-wider">Signed in as:</p>
          <Badge 
            pill 
            bg="light" 
            className="text-dark border px-3 py-2 fw-medium"
          >
            {user?.email} 
            <span className="ms-2 text-danger text-uppercase" style={{ fontSize: '10px' }}>
              • {user?.role}
            </span>
          </Badge>
        </div>

        <p className="text-muted mb-4 px-3">
          Your account does not have the required <strong>Administrator</strong> privileges 
          to access this dashboard module.
        </p>

        <div className="d-grid gap-2 px-4">
          {/* Primary Action: Logout so they can use an Admin account */}
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleLogoutAndSwitch}
            disabled={isLoading}
            style={{ 
              backgroundColor: "var(--accent-blue)", 
              border: "none",
              boxShadow: "var(--input-focus-shadow)" 
            }}
          >
            <i className="fa fa-sign-out-alt me-2"></i>
            {isLoading ? "Clearing Session..." : "Logout & Switch Account"}
          </Button>

          {/* Secondary Action: Go back */}
          <Button 
            variant="link" 
            className="text-decoration-none mt-2"
            onClick={() => navigate(-1)}
            style={{ color: "var(--text-muted)" }}
          >
            {/* <i className="fa fa-arrow-left me-2"></i> Go Back */}
          </Button>
        </div>

        <div className="mt-5 pt-3 border-top">
          <small className="text-uppercase text-muted tracking-widest" style={{ fontSize: '10px' }}>
            Security Protocol 403 • Restricted Area
          </small>
        </div>
      </Card>
    </Container>
  );
};

export default Unauthorized;