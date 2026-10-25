import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router'; // Using latest react-router
import { FaArrowLeft, FaFloppyDisk, FaUserPen } from 'react-icons/fa6'; // FaUserPen is perfect for Edit

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Gets the ID from the URL (/dashboard/edit-user/1)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bio: ''
  });

  // Simulate fetching user data on component load
  useEffect(() => {
    // In a real app, you would fetch by ID. Here is static data for demo:
    const existingUser = {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      password: 'password123',
      confirmPassword: 'password123',
      bio: 'Experienced software developer based in New York.'
    };
    
    setFormData(existingUser);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Updating User ${id}:`, formData);
    // Add your update API logic here
    navigate('/dashboard/users'); // Redirect back to list after save
  };

  return (
    <div className="main-content-container">
      {/* HEADER SECTION - Same style as Add/List */}
      <header className="page-header-box">
        <div className="header-title-wrapper">
          <div className="icon-shape">
            <FaUserPen size={18} />
          </div>
          <h4>Edit User: <span className="text-primary">#{id}</span></h4>
        </div>
        <button className="btn-back-outline" onClick={() => navigate(-1)}>
          <FaArrowLeft size={14} /> Back
        </button>
      </header>

      {/* FORM SECTION */}
      <div className="content-card shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* Full Name */}
            <div className="col-md-6">
              <label className="label-custom">Full Name *</label>
              <input 
                type="text" 
                name="fullName"
                className="form-control-custom" 
                value={formData.fullName}
                onChange={handleChange}
                required 
              />
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="label-custom">Email Address *</label>
              <input 
                type="email" 
                name="email"
                className="form-control-custom" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            {/* Phone */}
            <div className="col-md-12">
              <label className="label-custom">Phone Number</label>
              <input 
                type="text" 
                name="phone"
                className="form-control-custom" 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Password - Usually hidden or separate in Edit, but kept as per your request */}
            <div className="col-md-6">
              <label className="label-custom">New Password (Leave blank to keep current)</label>
              <input 
                type="password" 
                name="password"
                className="form-control-custom" 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="col-md-6">
              <label className="label-custom">Confirm New Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                className="form-control-custom" 
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Bio */}
            <div className="col-12">
              <label className="label-custom">Bio / About User</label>
              <textarea 
                name="bio"
                className="form-control-custom" 
                rows="4" 
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="form-footer">
            <button type="button" className="btn-back-outline" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-custom no-underline shadow-sm">
              <FaFloppyDisk size={16} /> Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;