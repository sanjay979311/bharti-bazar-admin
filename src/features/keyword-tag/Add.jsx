

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap";

import { useGetCategoriesQuery } from '../category/categoryApiSlice';
import { useGetUnitsQuery } from "../unit/unitApiSlice";
import { useCreateKeywordTagMutation } from "./keywordTagApiSlice";

// Icons
import { FaTags, FaArrowLeft, FaSave } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa6";

const AddKeywordTag = () => {
  const navigate = useNavigate();

  // --- API Hooks ---
  const [createKeywordTag, { isLoading: isSubmitting }] = useCreateKeywordTagMutation();
  const { data: categoryData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: unitData, isLoading: unitsLoading } = useGetUnitsQuery();

  // --- Safe Data Extraction ---
  const categoriesList = Array.isArray(categoryData) 
    ? categoryData 
    : categoryData?.categories || categoryData?.data || categoryData?.result || [];

  const unitsList = Array.isArray(unitData) 
    ? unitData 
    : unitData?.units || unitData?.data || unitData?.result || [];

  // --- State ---
  const [formData, setFormData] = useState({
    keyword: "",
    slug: "",
    category_id: "",
    allowed_units: [],
    default_unit: "",
    target_hubs: "",
  });

  // Auto-generate slug from keyword
  useEffect(() => {
    const generatedSlug = formData.keyword
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    setFormData((prev) => ({ ...prev, slug: generatedSlug }));
  }, [formData.keyword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Multi-Select for Allowed Units
  const handleUnitsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({
      ...prev,
      allowed_units: selectedOptions,
      // Reset default_unit if it's no longer in allowed_units
      default_unit: selectedOptions.includes(prev.default_unit) ? prev.default_unit : ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.keyword.trim() || !formData.category_id || formData.allowed_units.length === 0) {
      return toast.warning("Keyword, category, and at least one allowed unit are required");
    }

    // Convert comma-separated target hubs string into an array
    const formattedHubs = formData.target_hubs
      ? formData.target_hubs.split(",").map((hub) => hub.trim()).filter(Boolean)
      : [];

    const submissionData = {
      ...formData,
      target_hubs: formattedHubs,
    };

    try {
      await createKeywordTag(submissionData).unwrap();
      toast.success("Keyword tag created successfully!");
      setTimeout(() => navigate("/dashboard/keyword-tags"), 1500);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create keyword tag");
    }
  };

  return (
    <div className="main-content-container">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="colored" />

      <div className="page-header-box">
        <div className="header-title-wrapper">
          <div className="icon-shape">
            <FaTags />
          </div>
          <div>
            <h4 className="mb-0">New Keyword Tag</h4>
            <p className="small text-muted mb-0">Create and manage keyword tags for product filtration and search</p>
          </div>
        </div>
        <button className="btn-back-outline" onClick={() => navigate(-1)}>
          <FaArrowLeft size={12} /> Back
        </button>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="content-card">
            <form onSubmit={handleSubmit} id="keyword-tag-form">
              <h6 className="section-label-caps">Tag Information</h6>

              <div className="row g-4 mt-1">
                {/* Keyword */}
                <div className="col-md-6">
                  <label className="label-custom">Keyword</label>
                  <input
                    type="text"
                    className="form-control-custom"
                    name="keyword"
                    value={formData.keyword}
                    onChange={handleInputChange}
                    placeholder="e.g. onion, jeans, wheat"
                    required
                  />
                </div>

                {/* Slug (Auto-generated) */}
                <div className="col-md-6">
                  <label className="label-custom">Slug</label>
                  <input
                    type="text"
                    className="form-control-custom bg-light"
                    name="slug"
                    value={formData.slug}
                    readOnly
                    placeholder="auto-generated-slug"
                  />
                </div>

                {/* Category Selection */}
                <div className="col-md-12">
                  <label className="label-custom">Category Suggestion Link</label>
                  {categoriesLoading ? (
                    <div className="d-flex align-items-center gap-2 text-muted small mt-1">
                      <Spinner animation="border" size="sm" /> Loading categories...
                    </div>
                  ) : (
                    <select
                      className="form-control-custom"
                      name="category_id"
                      value={formData.category_id}
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

                {/* Allowed Units (Multi-Select) */}
                <div className="col-md-6">
                  <label className="label-custom">Allowed Units (Hold Ctrl/Cmd to select multiple)</label>
                  {unitsLoading ? (
                    <div className="d-flex align-items-center gap-2 text-muted small mt-1">
                      <Spinner animation="border" size="sm" /> Loading units...
                    </div>
                  ) : (
                    <select
                      multiple
                      className="form-control-custom"
                      name="allowed_units"
                      value={formData.allowed_units}
                      onChange={handleUnitsChange}
                      style={{ height: "130px" }}
                      required
                    >
                      {unitsList.map((unit) => (
                        <option key={unit._id} value={unit._id}>
                          {unit.name} ({unit.short_code})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Default Unit (Primary Unit) */}
                <div className="col-md-6">
                  <label className="label-custom">Default Primary Unit</label>
                  <select
                    className="form-control-custom"
                    name="default_unit"
                    value={formData.default_unit}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Select Default Unit --</option>
                    {unitsList
                      .filter((unit) => formData.allowed_units.includes(unit._id))
                      .map((unit) => (
                        <option key={unit._id} value={unit._id}>
                          {unit.name} ({unit.short_code})
                        </option>
                      ))}
                  </select>
                  <small className="text-muted d-block mt-1">Choose from your selected allowed units above.</small>
                </div>

                {/* Target Hubs */}
                <div className="col-md-12">
                  <label className="label-custom">Target Hubs (Comma-separated)</label>
                  <input
                    type="text"
                    className="form-control-custom"
                    name="target_hubs"
                    value={formData.target_hubs}
                    onChange={handleInputChange}
                    placeholder="e.g. Gorakhpur, Khalilabad, Basti"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="col-lg-4">
          <div className="content-card sticky-top" style={{ top: "20px" }}>
            <h6 className="section-label-caps mb-3">
              <FaLayerGroup className="me-2" /> Action Summary
            </h6>

            <div className="p-3 bg-light rounded mb-4 small text-muted">
              <p className="mb-2"><strong>Selected Units:</strong> {formData.allowed_units.length} units chosen</p>
              <p className="mb-0"><strong>Hubs Targeted:</strong> {formData.target_hubs ? formData.target_hubs.split(",").length : 0} hubs</p>
            </div>

            <button
              form="keyword-tag-form"
              type="submit"
              disabled={isSubmitting}
              className="btn-primary-custom w-100 py-3"
            >
              {isSubmitting ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                <>
                  <FaSave size={16} className="me-2" /> Save Keyword Tag
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddKeywordTag;