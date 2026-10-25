// const Pricing = () => {
//   return (
//     <div className="container py-5 text-center">
//       <h2 className="fw-bold mb-5">Pricing Plans</h2>

//       <div className="row">

//         <div className="col-md-4">
//           <div className="card shadow-sm p-3">
//             <h5>Basic</h5>
//             <h3>₹499/mo</h3>
//             <p className="text-muted small">For small schools</p>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card shadow p-3 border-primary">
//             <h5>Standard</h5>
//             <h3>₹999/mo</h3>
//             <p className="text-muted small">Most popular</p>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card shadow-sm p-3">
//             <h5>Premium</h5>
//             <h3>₹1999/mo</h3>
//             <p className="text-muted small">Advanced features</p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Pricing;

const Pricing = () => {
  return (
    <div className="bg-light">

      {/* HERO */}
      <section className="py-5 text-center bg-white border-bottom">
        <div className="container">
          <h1 className="fw-bold">Simple & Transparent Pricing</h1>
          <p className="text-muted">
            Choose the perfect plan for your school
          </p>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="container py-5">
        <div className="row g-4 justify-content-center">

          {/* BASIC */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center p-4 h-100">
              <h5 className="fw-bold">Basic</h5>
              <h2 className="fw-bold my-3">₹499/mo</h2>
              <ul className="list-unstyled text-muted small">
                <li>✔ Student Management</li>
                <li>✔ Attendance Tracking</li>
                <li>✔ Basic Reports</li>
                <li>❌ LMS Access</li>
              </ul>
              <button className="btn btn-outline-primary mt-3">
                Get Started
              </button>
            </div>
          </div>

          {/* STANDARD (POPULAR) */}
          <div className="col-md-4">
            <div className="card border-primary shadow text-center p-4 h-100 position-relative">

              <span className="badge bg-primary position-absolute top-0 start-50 translate-middle">
                Most Popular
              </span>

              <h5 className="fw-bold">Standard</h5>
              <h2 className="fw-bold my-3 text-primary">₹999/mo</h2>
              <ul className="list-unstyled text-muted small">
                <li>✔ Everything in Basic</li>
                <li>✔ LMS Platform</li>
                <li>✔ Fee Management</li>
                <li>✔ Email Support</li>
              </ul>
              <button className="btn btn-primary mt-3">
                Choose Plan
              </button>
            </div>
          </div>

          {/* PREMIUM */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center p-4 h-100">
              <h5 className="fw-bold">Premium</h5>
              <h2 className="fw-bold my-3">₹1999/mo</h2>
              <ul className="list-unstyled text-muted small">
                <li>✔ Everything in Standard</li>
                <li>✔ Advanced Analytics</li>
                <li>✔ Priority Support</li>
                <li>✔ Custom Features</li>
              </ul>
              <button className="btn btn-outline-primary mt-3">
                Contact Sales
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h3 className="fw-bold mb-3">
            Start managing your school smarter today
          </h3>
          <a href="/register" className="btn btn-light px-4">
            Start Free Trial
          </a>
        </div>
      </section>

    </div>
  );
};

export default Pricing;