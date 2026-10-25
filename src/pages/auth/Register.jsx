import { Link } from "react-router";

const Register = () => {
  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      
      <div className="card shadow border-0 p-4" style={{ maxWidth: "420px", width: "100%" }}>
        
        <h3 className="fw-bold text-center mb-3">Create Account 🚀</h3>
        <p className="text-muted text-center small mb-4">
          Start using EduManage today
        </p>

        <form>
          <div className="mb-3">
            <label className="form-label small">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" />
          </div>

          <div className="mb-3">
            <label className="form-label small">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" />
          </div>

          <div className="mb-3">
            <label className="form-label small">Password</label>
            <input type="password" className="form-control" placeholder="Create password" />
          </div>

          <button className="btn btn-primary w-100 mb-3">
            Register
          </button>

          <p className="text-center small">
            Already have an account?{" "}
            <Link to="/login" className="text-primary text-decoration-none">
              Login
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
};

export default Register;