import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="container-fluid">

      <div className="row min-vh-100">

        {/* Left Side (Branding / Info) */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-primary text-white p-5">
          <h2 className="fw-bold mb-3">EduManage 🚀</h2>
          <p className="text-center">
            Smart School Management & LMS platform to manage your entire education system in one place.
          </p>
        </div>

        {/* Right Side (Form Area) */}
        <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
          <div style={{ width: "100%", maxWidth: "420px" }}>
            <Outlet />
          </div>
        </div>

      </div>

    </div>
  );
};

export default AuthLayout;