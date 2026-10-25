import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap";

import { useGetCategoriesQuery } from '../category/categoryApiSlice';

// Hooks
import { useCreateUnitMutation } from "./unitApiSlice";

// Icons
import { FaBalanceScale, FaArrowLeft, FaSave } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa6";

const AddUnit = () => {
  const navigate = useNavigate();

  // --- API Hooks ---
  const [createUnit, { isLoading: isSubmitting }] = useCreateUnitMutation();
  const { data: categoryData, isLoading: categoriesLoading } = useGetCategoriesQuery();

  // --- Safe Categories Extraction ---
  const categoriesList = Array.isArray(categoryData) 
    ? categoryData 
    : categoryData?.categories || categoryData?.data || categoryData?.result || [];

  // --- State ---
  const [formData, setFormData] = useState({
    name: "",
    short_code: "",
    category: "",
    is_active: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.short_code.trim() || !formData.category) {
      return toast.warning("Name, short code, and category are required");
    }

    try {
      await createUnit(formData).unwrap();
      toast.success("Unit created successfully!");
      setTimeout(() => navigate("/dashboard/units"), 1500);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create unit");
    }
  };

  return (
    <div className="main-content-container">
      {/* Toast position changed to top-center */}
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="colored" />

      <div className="page-header-box">
        <div className="header-title-wrapper">
          <div className="icon-shape">
            <FaBalanceScale />
          </div>
          <div>
            <h4 className="mb-0">New Measurement Unit</h4>
            <p className="small text-muted mb-0">Create and manage inventory tracking units</p>
          </div>
        </div>
        <button className="btn-back-outline" onClick={() => navigate(-1)}>
          <FaArrowLeft size={12} /> Back
        </button>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="content-card">
            <form onSubmit={handleSubmit} id="unit-form">
              <h6 className="section-label-caps">General Information</h6>

              <div className="row g-4 mt-1">
                <div className="col-md-6">
                  <label className="label-custom">Unit Name</label>
                  <input
                    type="text"
                    className="form-control-custom"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Kilogram, Litre"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="label-custom">Short Code / Symbol</label>
                  <input
                    type="text"
                    className="form-control-custom"
                    name="short_code"
                    value={formData.short_code}
                    onChange={handleInputChange}
                    placeholder="e.g. kg, ltr"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <label className="label-custom">Select Category</label>
                  {categoriesLoading ? (
                    <div className="d-flex align-items-center gap-2 text-muted small mt-1">
                      <Spinner animation="border" size="sm" /> Loading categories...
                    </div>
                  ) : (
                    <select
                      className="form-control-custom"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Choose Category --</option>
                      {categoriesList.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name} {cat.level ? `(Level ${cat.level})` : ""}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="content-card sticky-top" style={{ top: "20px" }}>
            <h6 className="section-label-caps mb-3">
              <FaToggleOn className="me-2" /> Unit Status
            </h6>

            <div className="p-3 bg-light rounded mb-4">
              <div className="form-check form-switch m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="isActiveSwitch"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                />
                <label className="form-check-label label-custom ms-2" htmlFor="isActiveSwitch">
                  {formData.is_active ? "Active (Visible in inventory)" : "Inactive (Hidden)"}
                </label>
              </div>
            </div>

            <button
              form="unit-form"
              type="submit"
              disabled={isSubmitting}
              className="btn-primary-custom w-100 py-3"
            >
              {isSubmitting ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                <>
                  <FaSave size={16} className="me-2" /> Save Unit
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUnit;