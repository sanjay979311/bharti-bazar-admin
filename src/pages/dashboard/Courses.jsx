const Courses = () => {
  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h4>Courses</h4>
        <button className="btn btn-primary btn-sm">+ Add Course</button>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>Mathematics</h6>
            <p className="text-muted small">Basic to Advanced</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;