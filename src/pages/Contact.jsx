// const Contact = () => {
//   return (
//     <div className="container py-5">
//       <h2 className="fw-bold mb-4">Contact Us</h2>

//       <form className="row g-3">
//         <div className="col-md-6">
//           <input type="text" className="form-control" placeholder="Your Name" />
//         </div>

//         <div className="col-md-6">
//           <input type="email" className="form-control" placeholder="Email" />
//         </div>

//         <div className="col-12">
//           <textarea className="form-control" rows="4" placeholder="Message"></textarea>
//         </div>

//         <div className="col-12">
//           <button className="btn btn-primary">Send Message</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Contact;

const Contact = () => {
  return (
    <div className="bg-light">

      {/* HERO */}
      <section className="py-5 text-center bg-white border-bottom">
        <div className="container">
          <h1 className="fw-bold">Contact Us</h1>
          <p className="text-muted">
            We'd love to hear from you. Get in touch with us anytime.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="container py-5">
        <div className="row g-4">

          {/* LEFT INFO */}
          <div className="col-md-5">
            <div className="card border-0 shadow-sm p-4 h-100">

              <h5 className="fw-bold mb-4">📞 Get In Touch</h5>

              <div className="mb-3">
                <h6 className="fw-bold">📍 Address</h6>
                <p className="text-muted small">
                  Kolkata, West Bengal, India
                </p>
              </div>

              <div className="mb-3">
                <h6 className="fw-bold">📧 Email</h6>
                <p className="text-muted small">
                  support@edumanage.com
                </p>
              </div>

              <div className="mb-3">
                <h6 className="fw-bold">📱 Phone</h6>
                <p className="text-muted small">
                  +91 98765 43210
                </p>
              </div>

              <div className="mt-4">
                <p className="text-muted small">
                  Our team usually responds within 24 hours.
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-md-7">
            <div className="card border-0 shadow-sm p-4">

              <h5 className="fw-bold mb-4">Send Message</h5>

              <form>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    rows="4"
                    className="form-control"
                    placeholder="Your Message"
                  ></textarea>
                </div>

                <button className="btn btn-primary w-100">
                  Send Message
                </button>

              </form>

            </div>
          </div>

        </div>
      </section>

      {/* MAP / EXTRA */}
      <section className="container pb-5">
        <div className="card border-0 shadow-sm p-4 text-center">
          <h6 className="fw-bold mb-2">🌍 Our Location</h6>
          <p className="text-muted small">
            Serving schools across India, especially small cities.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Contact;