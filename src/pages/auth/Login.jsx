// import { Link } from "react-router";

// const Login = () => {
//   return (
//     <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      
//       <div className="card shadow border-0 p-4" style={{ maxWidth: "420px", width: "100%" }}>
        
//         <h3 className="fw-bold text-center mb-3">Welcome Back 👋</h3>
//         <p className="text-muted text-center small mb-4">
//           Login to your EduManage account
//         </p>

//         <form>
//           <div className="mb-3">
//             <label className="form-label small">Email</label>
//             <input type="email" className="form-control" placeholder="Enter your email" />
//           </div>

//           <div className="mb-3">
//             <label className="form-label small">Password</label>
//             <input type="password" className="form-control" placeholder="Enter password" />
//           </div>

//           <button className="btn btn-primary w-100 mb-3">
//             Login
//           </button>

//           <p className="text-center small">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-primary text-decoration-none">
//               Register
//             </Link>
//           </p>
//         </form>

//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from 'react';
import './Login.css'; // Import the separate CSS file

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for Admin Login only
    console.log('Admin login attempt:', { email, password });
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Admin Portal</h1>
          <p className="login-subtitle">Secure access for administrators only</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label className="input-label">Admin Email</label>
            <input
              type="email"
              placeholder="admin@system.com"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;