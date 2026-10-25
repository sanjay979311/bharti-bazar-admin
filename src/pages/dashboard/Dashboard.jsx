const Dashboard = () => {
  return (
    <div>
      <h4 className="mb-4">Dashboard Overview</h4>

      <div className="row">
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6>Total Students</h6>
            <h3>120</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6>Courses</h6>
            <h3>15</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6>Attendance %</h6>
            <h3>92%</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6>Fees Collected</h6>
            <h3>₹2.5L</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;