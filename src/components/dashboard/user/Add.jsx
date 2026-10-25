import React, { useState } from 'react';
import { useNavigate } from 'react-router'; // Using latest react-router
import { FaArrowLeft, FaFloppyDisk, FaUserPlus } from 'react-icons/fa6'; // Changed FaSave to FaFloppyDisk

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving User Data:", formData);
    // Add your save logic here
  };

  return (
    <div className="main-content-container">
      {/* HEADER SECTION */}
      <header className="page-header-box">
        <div className="header-title-wrapper">
          <div className="icon-shape">
            <FaUserPlus size={18} />
          </div>
          <h4>Add New User</h4>
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
                placeholder="Enter full name"
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
                placeholder="Enter email"
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
                placeholder="e.g. +1 234 567 890" 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="col-md-6">
              <label className="label-custom">Password *</label>
              <input 
                type="password" 
                name="password"
                className="form-control-custom" 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>

            {/* Confirm Password */}
            <div className="col-md-6">
              <label className="label-custom">Confirm Password *</label>
              <input 
                type="password" 
                name="confirmPassword"
                className="form-control-custom" 
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
            </div>

            {/* Bio */}
            <div className="col-12">
              <label className="label-custom">Bio / About User</label>
              <textarea 
                name="bio"
                className="form-control-custom" 
                rows="4" 
                placeholder="Tell us something about the user..."
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
              <FaFloppyDisk size={16} /> Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;