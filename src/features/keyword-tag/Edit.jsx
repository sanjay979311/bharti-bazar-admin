import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap";

import { useGetCategoriesQuery } from '../category/categoryApiSlice';
import { useGetUnitsQuery } from "../unit/unitApiSlice";
import { 
  useGetKeywordTagByIdQuery, 
  useUpdateKeywordTagMutation 
} from "./keywordTagApiSlice";

// Icons
import { FaTags, FaArrowLeft, FaSave } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa6";

const EditKeywordTag = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- API Hooks ---
  const { data: tagData, isLoading: isDataLoading } = useGetKeywordTagByIdQuery(id);
  const { data: categoryData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: unitData, isLoading: unitsLoading } = useGetUnitsQuery();
  const [updateKeywordTag, { isLoading: isSubmitting }] = useUpdateKeywordTagMutation();

  // --- Safe Data Extraction ---
  const keywordTag = tagData?.keywordTag || tagData?.tag || tagData;

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

  // --- Populate Data on Load ---
  useEffect(() => {
    if (keywordTag) {
      // Safely extract allowed_units IDs whether they are objects or strings
      const formattedAllowedUnits = Array.isArray(keywordTag.allowed_units)
        ? keywordTag.allowed_units.map((u) => (typeof u === "object" && u !== null ? u._id : u))
        : [];

      // Safely extract default_unit ID
      const formattedDefaultUnit = keywordTag.default_unit
        ? (typeof keywordTag.default_unit === "object" && keywordTag.default_unit !== null ? keywordTag.default_unit._id : keywordTag.default_unit)
        : "";

      // Safely extract category_id ID
      const formattedCategoryId = keywordTag.category_id
        ? (typeof keywordTag.category_id === "object" && keywordTag.category_id !== null ? keywordTag.category_id._id : keywordTag.category_id)
        : "";

      // Handle target_hubs array to comma-separated string
      const formattedHubs = Array.isArray(keywordTag.target_hubs)
        ? keywordTag.target_hubs.join(", ")
        : "";

      setFormData({
        keyword: keywordTag.keyword || "",
        slug: keywordTag.slug || "",
        category_id: formattedCategoryId,
        allowed_units: formattedAllowedUnits,
        default_unit: formattedDefaultUnit,
        target_hubs: formattedHubs,
      });
    }
  }, [keywordTag]);

  // Auto-generate slug from keyword changes
  useEffect(() => {
    if (formData.keyword) {
      const generatedSlug = formData.keyword
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
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
      // Matches the updated RTK query signature: ({ id, ...patchData }) => ({ body: patchData })
      await updateKeywordTag({ id, ...submissionData }).unwrap();
      toast.success("Keyword tag updated successfully!");
      setTimeout(() => navigate("/dashboard/keyword-tags"), 1500);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update keyword tag");
    }
  };

  if (isDataLoading) {
    return (
      <div className="main-content-container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading keyword tag data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content-container">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="colored" />

      <div className="page-header-box">
        <div className="header-title-wrapper">
          <div className="icon-shape">
            <FaTags />
          </div>
          <div>
            <h4 className="mb-0">Edit Keyword Tag</h4>
            <p className="small text-muted mb-0">Update keyword tag properties, category linkages, and allowed units</p>
          </div>
        </div>
        <button className="btn-back-outline" onClick={() => navigate(-1)}>
          <FaArrowLeft size={12} /> Back
        </button>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="content-card">
            <form onSubmit={handleSubmit} id="edit-keyword-tag-form">
              <h6 className="section-label-caps">Tag Information</h6>

              <div className="row g-4 mt-1">
                {/* Keyword */}
                <div className="col-md-6">
                  <label className="label-custom">Keyword Name *</label>
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
                  <label className="label-custom">Slug (Auto)</label>
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
                  <label className="label-custom">Link Category *</label>
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
                  <label className="label-custom">Allowed Units * (Hold Ctrl/Cmd for multiple)</label>
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
                      style={{ height: "140px" }}
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
                    <option value="">-- Select Primary Default Unit --</option>
                    {unitsList
                      .filter((unit) => formData.allowed_units.includes(unit._id))
                      .map((unit) => (
                        <option key={unit._id} value={unit._id}>
                          {unit.name} ({unit.short_code})
                        </option>
                      ))}
                  </select>
                  <small className="text-muted d-block mt-2">
                    Must be selected from your allowed units list.
                  </small>
                </div>

                {/* Target Hubs */}
                <div className="col-md-12">
                  <label className="label-custom">Target Mandis / Trading Hubs (Comma-separated)</label>
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

        {/* Sidebar Summary & Action */}
        <div className="col-lg-4">
          <div className="content-card sticky-top" style={{ top: "20px" }}>
            <h6 className="section-label-caps mb-3">
              <FaLayerGroup className="me-2" /> Summary
            </h6>

            <div className="p-3 bg-light rounded mb-4 small text-muted">
              <p className="mb-2"><strong>Selected Units:</strong> {formData.allowed_units.length} units chosen</p>
              <p className="mb-0"><strong>Target Hubs:</strong> {formData.target_hubs ? formData.target_hubs.split(",").filter(Boolean).length : 0} hubs</p>
            </div>

            <button
              form="edit-keyword-tag-form"
              type="submit"
              disabled={isSubmitting}
              className="btn-primary-custom w-100 py-3"
            >
              {isSubmitting ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                <>
                  <FaSave size={16} className="me-2" /> Update Keyword Tag
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditKeywordTag;