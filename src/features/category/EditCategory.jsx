import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";

// RTK Query Hooks
import { 
  useGetCategoryByIdQuery, 
  useUpdateCategoryMutation, 
  useGetCategoriesQuery 
} from "./categoryApiSlice";

// Icons
import { FaLayerGroup, FaArrowLeft, FaGlobe, FaXmark } from "react-icons/fa6";
import { FaSave, FaCloudUploadAlt } from "react-icons/fa";

const EditCategory = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // RTK Queries & Mutation
  const { data: categoryDataResponse, isLoading: isFetching } = useGetCategoryByIdQuery(id);
  const { data: categoriesData } = useGetCategoriesQuery();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  // Extract data safely based on API response formats
  const allCategories = categoriesData?.categories || categoriesData?.data || categoriesData || [];
  const categoryData = categoryDataResponse?.data || categoryDataResponse;

  // State (Synced with Mongoose Schema)
  const [formData, setFormData] = useState({
    categoryName: "",
    categorySlug: "",
    level: 1,
    parent_category: "",
    alternate_names: "",
    metaTitle: "",
    metaDescription: "",
    is_active: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // --- Effect to Pre-fill Data on Load ---
  useEffect(() => {
    if (categoryData) {
      setFormData({
        categoryName: categoryData.name || "",
        categorySlug: categoryData.slug || "",
        level: categoryData.level || 1,
        parent_category: categoryData.parent_category?._id || categoryData.parent_category || "",
        alternate_names: Array.isArray(categoryData.alternate_names) ? categoryData.alternate_names.join(", ") : "",
        metaTitle: categoryData.seo?.meta_title || categoryData.metaTitle || "",
        metaDescription: categoryData.seo?.meta_description || categoryData.metaDescription || "",
        is_active: categoryData.is_active !== undefined ? categoryData.is_active : true,
      });

      // Set existing image preview
      if (categoryData.image) {
        const imageSrc = categoryData.image.startsWith('http') 
          ? categoryData.image 
          : `${BASE_URL}/uploads/${categoryData.image}`;
        setPreview(imageSrc);
      }
    }
  }, [categoryData, BASE_URL]);

  // Cleanup object URL on unmount to prevent memory leaks
  useEffect(() => {
    return () => { 
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview); 
      }
    };
  }, [preview]);

  // Logic: Handle Name & Auto-Slug & Meta Title
  const handleNameChange = (e) => {
    const value = e.target.value;
    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((prev) => ({
      ...prev,
      categoryName: value,
      categorySlug: generatedSlug,
      metaTitle: value ? `${value} - Local Business Category` : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // CRITICAL: If level changes to 1, automatically clear parent category
      if (name === "level" && Number(value) === 1) {
        updated.parent_category = "";
      }

      return updated;
    });
  };

  // Logic: Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("File size is too large (Max 2MB)");
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setImageFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Logic: Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Level 2 or 3 requires parent category selection
    if (Number(formData.level) > 1 && !formData.parent_category) {
      return toast.error("Please select a Parent Category for Sub/Child category");
    }

    const data = new FormData();
    data.append("name", formData.categoryName);
    data.append("slug", formData.categorySlug);
    data.append("level", formData.level);
    
    if (Number(formData.level) > 1 && formData.parent_category) {
      data.append("parent_category", formData.parent_category);
    } else {
      data.append("parent_category", "");
    }
    
    // Convert alternate names comma-separated string to array items
    if (formData.alternate_names) {
      const altNamesArray = formData.alternate_names.split(",").map((n) => n.trim());
      altNamesArray.forEach((name) => data.append("alternate_names[]", name));
    }

    data.append("seo[meta_title]", formData.metaTitle);
    data.append("seo[meta_description]", formData.metaDescription);
    data.append("is_active", formData.is_active);

    // Only append new image file if selected
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      await updateCategory({ id, data }).unwrap();
      toast.success("Category updated successfully!", { position: "top-center" });
      setTimeout(() => navigate("/dashboard/categories"), 1500);
    } catch (err) {
      toast.error(err?.data?.error || err?.data?.message || "Error updating category");
    }
  };

  // Filter valid parent categories securely (exclude self and check hierarchical levels)
  const filteredParents = allCategories.filter((cat) => {
    const currentLevel = Number(formData.level);
    
    // Prevent self-parenting
    if (cat._id === id) return false;
    
    // Level 2 can only choose Level 1 parents
    if (currentLevel === 2) return cat.level === 1;
    
    // Level 3 can only choose Level 2 parents
    if (currentLevel === 3) return cat.level === 2;
    
    return false;
  });

  if (isFetching) {
    return <div className="p-5 text-center text-muted">Loading category data...</div>;
  }

  return (
    <div className="main-content-container">
      <ToastContainer position="top-right" theme="colored" />

      {/* Header */}
      <div className="page-header-box">
        <div className="header-title-wrapper">
          <div className="icon-shape">
            <FaLayerGroup />
          </div>
          <div>
            <h4 className="mb-0">Edit Category</h4>
            <p className="small text-muted mb-0">Modify category details and configuration</p>
          </div>
        </div>
        <button className="btn-back-outline" onClick={() => navigate(-1)}>
          <FaArrowLeft size={12} /> Back
        </button>
      </div>

      <div className="row g-4">
        {/* Left Column: Form Details */}
        <div className="col-lg-8">
          <div className="content-card">
            <form onSubmit={handleSubmit} id="category-form">
              <h6 className="section-label-caps">General Information</h6>
              
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="label-custom">Category Name</label>
                  <input
                    type="text"
                    className="form-control-custom form-control"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleNameChange}
                    placeholder="e.g. Home Services"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="label-custom">URL Slug</label>
                  <div className="slug-input-wrapper">
                    <span className="slug-prefix">/</span>
                    <input
                      type="text"
                      className="slug-field form-control bg-light"
                      value={formData.categorySlug}
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="label-custom">Category Level</label>
                  <select
                    className="form-control-custom form-control"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                  >
                    <option value={1}>Level 1 (Main Category)</option>
                    <option value={2}>Level 2 (Sub Category)</option>
                    <option value={3}>Level 3 (Child Category)</option>
                  </select>
                </div>

                {/* Conditional Parent Category Dropdown */}
                {Number(formData.level) > 1 && (
                  <div className="col-md-6">
                    <label className="label-custom">
                      Parent Category <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control-custom form-control"
                      name="parent_category"
                      value={formData.parent_category}
                      onChange={handleChange}
                      required={Number(formData.level) > 1}
                    >
                      <option value="">-- Select Parent Category --</option>
                      {filteredParents.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name} (Level {cat.level})
                        </option>
                      ))}
                    </select>
                    {filteredParents.length === 0 && (
                      <small className="text-danger mt-1 d-block">
                        No available parent categories found for Level {formData.level}. Create a Level {Number(formData.level) - 1} category first.
                      </small>
                    )}
                  </div>
                )}

                <div className="col-12">
                  <label className="label-custom">Alternate Names (Comma separated)</label>
                  <input
                    type="text"
                    className="form-control-custom form-control"
                    name="alternate_names"
                    value={formData.alternate_names}
                    onChange={handleChange}
                    placeholder="e.g. Repairs, Maintenance, Handyman"
                  />
                </div>

                <div className="col-12">
                  <div className="form-check form-switch mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_active"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                    />
                    <label className="form-check-label ms-2" htmlFor="is_active">
                      Active Status
                    </label>
                  </div>
                </div>
              </div>

              {/* SEO Section */}
              <div className="mt-5">
                <h6 className="section-label-caps">
                  <FaGlobe className="me-2" /> Search Engine Optimization
                </h6>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="d-flex justify-content-between">
                      <label className="label-custom">Meta Title</label>
                      <small className={formData.metaTitle.length > 60 ? "text-danger" : "text-muted"}>
                        {formData.metaTitle.length}/60
                      </small>
                    </div>
                    <input
                      type="text"
                      name="metaTitle"
                      className="form-control-custom form-control"
                      value={formData.metaTitle}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <div className="d-flex justify-content-between">
                      <label className="label-custom">Meta Description</label>
                      <small className={formData.metaDescription.length > 160 ? "text-danger" : "text-muted"}>
                        {formData.metaDescription.length}/160
                      </small>
                    </div>
                    <textarea
                      name="metaDescription"
                      className="form-control-custom form-control"
                      rows="2"
                      value={formData.metaDescription}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Google Preview Widget */}
                  <div className="col-12 mt-2">
                    <div className="google-preview-box p-3 border rounded bg-light">
                      <span className="preview-label text-muted small d-block mb-1">Google Search Preview</span>
                      <div className="preview-title text-primary fw-bold">
                        {formData.metaTitle || "Category Title"}
                      </div>
                      <div className="preview-url text-success small">
                        yourdomain.com <span className="mx-1">›</span> category <span className="mx-1">›</span> {formData.categorySlug || 'slug'}
                      </div>
                      <div className="preview-desc text-secondary small mt-1">
                        {formData.metaDescription || "Enter a meta description to see the search engine preview..."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Media & Actions */}
        <div className="col-lg-4">
          <div className="content-card sticky-top" style={{ top: "20px" }}>
            <h6 className="label-custom mb-3">Category Image (Optional)</h6>

            <div
              className={`upload-zone border border-dashed p-4 text-center rounded bg-light ${preview ? 'has-preview' : ''}`}
              style={{ cursor: "pointer" }}
              onClick={() => !preview && fileInputRef.current.click()}
            >
              {preview ? (
                <div className="preview-container position-relative">
                  <img src={preview} alt="Preview" className="img-fluid rounded" style={{ maxHeight: "200px" }} />
                  <button type="button" onClick={removeImage} className="remove-preview-btn btn btn-danger btn-sm position-absolute top-0 end-0 m-2">
                    <FaXmark />
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder py-4">
                  <div className="upload-icon-circle text-primary mb-2">
                    <FaCloudUploadAlt size={28} />
                  </div>
                  <p className="upload-text mb-1 fw-bold">Select Image</p>
                  <p className="upload-hint text-muted small mb-0">JPG, PNG or WEBP (Max 2MB)</p>
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="d-none"
              accept="image/*"
              onChange={handleImageChange}
            />

            <button
              form="category-form"
              type="submit"
              disabled={isUpdating}
              className="btn btn-primary w-100 py-3 mt-4 shadow-sm"
            >
              {isUpdating ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                <><FaSave className="me-2" /> Save Changes</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;