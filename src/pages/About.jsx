const About = () => {
  return (
    <div className="bg-light">

      {/* HERO */}
      <section className="py-5 text-center bg-white border-bottom">
        <div className="container">
          <h1 className="fw-bold display-5">About EduManage</h1>
          <p className="text-muted lead">
            Transforming schools with smart digital solutions.
          </p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="container py-5">

        <div className="row g-4">

          {/* Who We Are */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100 p-4">
              <h5 className="fw-bold mb-3">👨‍💻 Who We Are</h5>
              <p className="text-muted small">
                EduManage is a modern School Management and LMS platform
                designed to simplify school operations. From student records
                to online classes, everything is managed in one system.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100 p-4">
              <h5 className="fw-bold mb-3">🎯 Our Mission</h5>
              <p className="text-muted small">
                Our mission is to help schools digitize their workflow,
                reduce manual work, and improve efficiency using simple
                and powerful technology.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100 p-4">
              <h5 className="fw-bold mb-3">🚀 Our Vision</h5>
              <p className="text-muted small">
                We aim to bring digital transformation to every school,
                especially in small cities, making education management
                smarter and more accessible.
              </p>
            </div>
          </div>

          {/* Why Choose */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100 p-4">
              <h5 className="fw-bold mb-3">⭐ Why Choose Us</h5>
              <p className="text-muted small">
                Easy to use, affordable, and powerful — EduManage helps
                schools manage everything from attendance to fees with ease.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="bg-white py-5 border-top">
        <div className="container text-center">

          <h3 className="fw-bold mb-4">What We Offer</h3>

          <div className="row g-4">

            <div className="col-md-3">
              <div className="p-3">
                <div className="fs-2">🏫</div>
                <h6 className="fw-bold mt-2">School ERP</h6>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3">
                <div className="fs-2">🎓</div>
                <h6 className="fw-bold mt-2">LMS Platform</h6>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3">
                <div className="fs-2">📊</div>
                <h6 className="fw-bold mt-2">Attendance</h6>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3">
                <div className="fs-2">💳</div>
                <h6 className="fw-bold mt-2">Fees System</h6>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h3 className="fw-bold mb-3">Ready to Get Started?</h3>
          <p className="mb-4">
            Join EduManage and digitize your school today.
          </p>
          <a href="/register" className="btn btn-light px-4">
            Create Free Account
          </a>
        </div>
      </section>

    </div>
  );
};

export default About;