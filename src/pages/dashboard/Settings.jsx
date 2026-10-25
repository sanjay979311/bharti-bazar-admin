const Settings = () => {
  return (
    <div>
      <h4 className="mb-4">Settings</h4>

      <form className="w-50">
        <div className="mb-3">
          <label className="form-label">School Name</label>
          <input type="text" className="form-control" placeholder="Enter name" />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>

        <button className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;