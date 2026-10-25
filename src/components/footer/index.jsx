// import { Link } from "react-router";

// const Footer = () => {
//   return (
//     <footer className="bg-dark text-light  pt-5">

//       <div className="container">

//         <div className="row">

//           {/* Brand */}
//           <div className="col-md-4 mb-4">
//             <h5 className="fw-bold text-primary">EduManage</h5>
//             <p className="small text-muted">
//               Smart School Management & LMS platform for modern education.
//               Manage students, courses, attendance & fees in one place.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div className="col-md-2 mb-4">
//             <h6 className="fw-bold">Quick Links</h6>
//             <ul className="list-unstyled small">
//               <li><Link to="/" className="text-decoration-none text-light">Home</Link></li>
//               <li><Link to="/about" className="text-decoration-none text-light">About</Link></li>
//               <li><Link to="/pricing" className="text-decoration-none text-light">Pricing</Link></li>
//               <li><Link to="/contact" className="text-decoration-none text-light">Contact</Link></li>
//             </ul>
//           </div>

//           {/* Services */}
//           <div className="col-md-3 mb-4">
//             <h6 className="fw-bold">Services</h6>
//             <ul className="list-unstyled small">
//               <li><Link to="/school-management" className="text-decoration-none text-light">School Management</Link></li>
//               <li><Link to="/lms" className="text-decoration-none text-light">LMS Platform</Link></li>
//               <li><Link to="/attendance" className="text-decoration-none text-light">Attendance System</Link></li>
//               <li><Link to="/fees" className="text-decoration-none text-light">Fees Management</Link></li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div className="col-md-3 mb-4">
//             <h6 className="fw-bold">Support</h6>
//             <ul className="list-unstyled small">
//               <li><Link to="/privacy" className="text-decoration-none text-light">Privacy Policy</Link></li>
//               <li><Link to="/terms" className="text-decoration-none text-light">Terms & Conditions</Link></li>
//               <li><Link to="/support" className="text-decoration-none text-light">Help Center</Link></li>
//             </ul>
//           </div>

//         </div>

//         {/* Divider */}
//         <hr className="border-secondary" />

//         {/* Bottom */}
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pb-3 small text-muted">
//           <p className="mb-2 mb-md-0">
//             © {new Date().getFullYear()} EduManage. All rights reserved.
//           </p>

//           <div className="d-flex gap-3">
//             <a href="#" className="text-muted text-decoration-none">Facebook</a>
//             <a href="#" className="text-muted text-decoration-none">LinkedIn</a>
//             <a href="#" className="text-muted text-decoration-none">Twitter</a>
//           </div>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;




// import { Link } from "react-router";
// import './style.css'

// const Footer = () => {
//   return (
//     <footer className="bg-footer text-light pt-5">
//       <div className="container">
//         <div className="row">

//           {/* Brand */}
//           <div className="col-md-4 mb-4">
//             <h5 className="fw-bold text-accent">EduManage</h5>
//             <p className="small text-light-50">
//               Smart School Management & LMS platform for modern education.
//               Manage students, courses, attendance & fees in one place.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div className="col-6 col-md-2 mb-4">
//             <h6 className="fw-bold text-light">Quick Links</h6>
//             <ul className="list-unstyled small">
//               <li><Link to="/" className="footer-link">Home</Link></li>
//               <li><Link to="/about" className="footer-link">About</Link></li>
//               <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
//               <li><Link to="/contact" className="footer-link">Contact</Link></li>
//             </ul>
//           </div>

//           {/* Services */}
//           <div className="col-6 col-md-3 mb-4">
//             <h6 className="fw-bold text-light">Services</h6>
//             <ul className="list-unstyled small">
//               <li><Link to="/school-management" className="footer-link">School Management</Link></li>
//               <li><Link to="/lms" className="footer-link">LMS Platform</Link></li>
//               <li><Link to="/attendance" className="footer-link">Attendance System</Link></li>
//               <li><Link to="/fees" className="footer-link">Fees Management</Link></li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div className="col-12 col-md-3 mb-4">
//             <h6 className="fw-bold text-light">Support</h6>
//             <ul className="list-unstyled small">
//               <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
//               <li><Link to="/terms" className="footer-link">Terms & Conditions</Link></li>
//               <li><Link to="/support" className="footer-link">Help Center</Link></li>
//             </ul>
//           </div>

//         </div>

//         {/* Divider */}
//         <hr className="border-secondary" />

//         {/* Bottom */}
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pb-3 small text-light-50">
//           <p className="mb-2 mb-md-0">
//             © {new Date().getFullYear()} EduManage. All rights reserved.
//           </p>

//           <div className="d-flex gap-3">
//             <a href="#" className="social-link">Facebook</a>
//             <a href="#" className="social-link">LinkedIn</a>
//             <a href="#" className="social-link">Twitter</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Link } from "react-router";
import './style.css'
const Footer = () => {
  return (
    <footer className="footer pt-5">
      <div className="container">
        <div className="row">

          {/* Brand */}
          <div className="col-12 col-md-4 mb-4">
            <h5 className="fw-bold text-accent">EduManage</h5>
            <p className="small footer-text">
              Smart School Management & LMS platform for modern education.
              Manage students, courses, attendance & fees in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-6 col-md-3 mb-4">
            <h6 className="fw-bold">Services</h6>
            <ul className="list-unstyled small">
              <li><Link to="/school-management" className="footer-link">School Management</Link></li>
              <li><Link to="/lms" className="footer-link">LMS Platform</Link></li>
              <li><Link to="/attendance" className="footer-link">Attendance System</Link></li>
              <li><Link to="/fees" className="footer-link">Fees Management</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-12 col-md-3 mb-4">
            <h6 className="fw-bold">Support</h6>
            <ul className="list-unstyled small">
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms" className="footer-link">Terms & Conditions</Link></li>
              <li><Link to="/support" className="footer-link">Help Center</Link></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Bottom */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pb-3 small">
          <p className="mb-2 mb-md-0 footer-text">
            © {new Date().getFullYear()} EduManage. All rights reserved.
          </p>

          <div className="d-flex gap-3">
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;