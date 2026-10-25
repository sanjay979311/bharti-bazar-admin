

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router"; 
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap";
import Select from "react-select"; 

// RTK Query Hooks
import { useGetCategoriesQuery } from "../category/categoryApiSlice";
import { useGetUnitsQuery } from "../unit/unitApiSlice";
import { useCreateProductMutation } from "./productApiSlice";

// Icons
import { 
  FaBoxOpen, 
  FaArrowLeft, 
  FaXmark, 
  FaCircleInfo, 
  FaTags, 
  FaLocationDot
} from "react-icons/fa6";
import { FaCloudUploadAlt, FaSave } from "react-icons/fa";

const AddProduct = () => {
  const navigate = useNavigate();
  const imageInputRef = useRef(null);

  // --- API Hooks ---
  const [createProduct, { isLoading: isSubmitting }] = useCreateProductMutation();
  const { data: categoryData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: unitData, isLoading: unitsLoading } = useGetUnitsQuery();

  // --- Safe Data Extraction ---
  const categoriesList = Array.isArray(categoryData) 
    ? categoryData 
    : categoryData?.categories || categoryData?.data || categoryData?.result || [];

  const unitsList = Array.isArray(unitData) 
    ? unitData 
    : unitData?.units || unitData?.data || unitData?.result || [];

  // --- Form State Management ---
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    product_name: "",
    slug: "",
    price: "",
    unit: "",             
    min_order_quantity: "1",
    category: "",         
    description: "",
    images: [],           
    city: "",             
    market_area: "",      
  });

  // --- Format options for react-select ---
  const categoryOptions = categoriesList.map((cat) => ({
    value: cat._id,
    label: `${cat.name} ${cat.level ? `(Level ${cat.level})` : ""}`,
    defaultUnit: cat.default_unit 
  }));

  const unitOptions = unitsList.map((unit) => ({
    value: unit._id,
    label: `${unit.name} (${unit.short_code})`
  }));

  // --- Auto-generate slug from product_name ---
  useEffect(() => {
    const generatedSlug = formData.product_name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setFormData((prev) => ({ ...prev, slug: generatedSlug }));
  }, [formData.product_name]);

  // --- Handlers for standard inputs ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- Handler for Searchable Category Change & Smart Unit Auto-Select ---
  const handleCategoryChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      category: selectedOption ? selectedOption.value : "",
      unit: selectedOption?.defaultUnit || prev.unit
    }));
  };

  // --- Handler for Searchable Unit Change ---
  const handleUnitChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      unit: selectedOption ? selectedOption.value : ""
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    if (formData.images.length + fileArray.length > 5) {
      toast.warning("You can upload a maximum of 5 images.");
      return;
    }

    setFormData((prev) => ({ 
      ...prev, 
      images: [...prev.images, ...fileArray] 
    }));

    const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index]);
      return updated.filter((_, i) => i !== index);
    });
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.product_name.trim() || !formData.price || !formData.unit || !formData.category || !formData.city) {
      return toast.warning("Please fill in all required fields (*)");
    }

    const payload = new FormData();
    payload.append("product_name", formData.product_name);
    payload.append("slug", formData.slug);
    payload.append("price", formData.price);
    payload.append("unit", formData.unit);
    payload.append("min_order_quantity", formData.min_order_quantity);
    payload.append("category", formData.category);
    payload.append("description", formData.description);
    payload.append("location[city]", formData.city);
    payload.append("location[market_area]", formData.market_area);

    formData.images.forEach((file) => {
      payload.append("images", file);
    });

    try {
      await createProduct(payload).unwrap();
      toast.success("Product created successfully!");
      setTimeout(() => navigate("/dashboard/products"), 1500);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create product");
    }
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#86b7fe' : '#ced4da',
      boxShadow: state.isFocused ? '0 0 0 0.25rem rgba(13, 110, 253, 0.25)' : null,
      '&:hover': { borderColor: '#86b7fe' },
      borderRadius: '0.375rem',
      padding: '2px',
      fontSize: '0.95rem'
    })
  };

  return (
    <div className="main-content-container">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="colored" />

      {/* Header */}
      <div className="page-header-box">
        <div className="header-title-wrapper">
          <div className="icon-shape">
            <FaBoxOpen />
          </div>
          <div>
            <h4 className="mb-0">Add New Product</h4>
            <p className="small text-muted mb-0">Fill in the item details and location info</p>
          </div>
        </div>
        <button type="button" className="btn-back-outline" onClick={() => navigate(-1)}>
          <FaArrowLeft size={12} /> Back
        </button>
      </div>

      <form onSubmit={handleSubmit} id="product-form">
        <div className="row g-4">
          <div className="col-lg-8">

            {/* Basic Information */}
            <div className="content-card mb-4">
              <h6 className="section-label-caps"><FaCircleInfo className="me-2"/> Basic Information</h6>
              <div className="row g-3">
                {/* Product Name */}
                <div className="col-md-6">
                  <label className="label-custom">Product Name:*</label>
                  <input 
                    type="text" 
                    name="product_name" 
                    className="form-control-custom form-control" 
                    required 
                    placeholder="e.g. Organic Basmati Rice" 
                    value={formData.product_name} 
                    onChange={handleInputChange} 
                  />
                </div>

                {/* Auto-Generated Slug */}
                <div className="col-md-6">
                  <label className="label-custom">Slug</label>
                  <input 
                    type="text" 
                    name="slug" 
                    className="form-control-custom form-control bg-light" 
                    readOnly 
                    placeholder="auto-generated-slug" 
                    value={formData.slug} 
                  />
                </div>

                {/* Price */}
                <div className="col-md-6">
                  <label className="label-custom">Price (₹):*</label>
                  <input 
                    type="number" 
                    name="price" 
                    className="form-control-custom form-control" 
                    required 
                    placeholder="0.00" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                  />
                </div>

                {/* Minimum Order Quantity */}
                <div className="col-md-6">
                  <label className="label-custom">Min Order Quantity:*</label>
                  <input 
                    type="number" 
                    name="min_order_quantity" 
                    className="form-control-custom form-control" 
                    min="1"
                    value={formData.min_order_quantity} 
                    onChange={handleInputChange} 
                  />
                </div>

                {/* Searchable Category Dropdown */}
                <div className="col-md-6">
                  <label className="label-custom">Category:*</label>
                  {categoriesLoading ? (
                    <div className="d-flex align-items-center gap-2 text-muted small mt-1">
                      <Spinner animation="border" size="sm" /> Loading categories...
                    </div>
                  ) : (
                    <Select
                      options={categoryOptions}
                      value={categoryOptions.find(opt => opt.value === formData.category) || null}
                      onChange={handleCategoryChange}
                      placeholder="Search & select category..."
                      isSearchable
                      isClearable
                      styles={customSelectStyles}
                    />
                  )}
                </div>

                {/* Searchable Unit Dropdown */}
                <div className="col-md-6">
                  <label className="label-custom">Unit:*</label>
                  {unitsLoading ? (
                    <div className="d-flex align-items-center gap-2 text-muted small mt-1">
                      <Spinner animation="border" size="sm" /> Loading units...
                    </div>
                  ) : (
                    <Select
                      options={unitOptions}
                      value={unitOptions.find(opt => opt.value === formData.unit) || null}
                      onChange={handleUnitChange}
                      placeholder="Search & select unit..."
                      isSearchable
                      isClearable
                      styles={customSelectStyles}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="content-card mb-4">
              <h6 className="section-label-caps"><FaLocationDot className="me-2"/> Location & Market Area</h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="label-custom">City:*</label>
                  <input 
                    type="text" 
                    name="city" 
                    className="form-control-custom form-control" 
                    required 
                    placeholder="e.g. Gorakhpur, Khalilabad, Basti" 
                    value={formData.city} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="col-md-6">
                  <label className="label-custom">Market Area:</label>
                  <input 
                    type="text" 
                    name="market_area" 
                    className="form-control-custom form-control" 
                    placeholder="e.g. Bardahiya Bazar, Sahabganj Mandi" 
                    value={formData.market_area} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="content-card">
              <h6 className="section-label-caps"><FaTags className="me-2"/> Description</h6>
              <div className="row g-3">
                <div className="col-12">
                  <label className="label-custom">Product Description:</label>
                  <textarea 
                    name="description" 
                    className="form-control-custom form-control" 
                    rows="4" 
                    placeholder="Write a brief product description..."
                    value={formData.description} 
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar (Media Uploads & Action Button) */}
          <div className="col-lg-4">
            <div className="content-card sticky-top" style={{ top: "20px" }}>
              <h6 className="label-custom mb-3">Product Images (Max 5)</h6>

              <div 
                className="upload-zone mb-3" 
                onClick={() => imageInputRef.current.click()} 
                style={{ cursor: "pointer", border: "2px dashed #ddd", padding: "20px", textAlign: "center", borderRadius: "8px" }}
              >
                <div className="upload-placeholder">
                  <FaCloudUploadAlt size={30} className="text-primary mb-2" />
                  <p className="upload-text mb-0">Click to Upload Images</p>
                </div>
              </div>
              <input 
                type="file" 
                ref={imageInputRef} 
                name="images" 
                multiple 
                className="d-none" 
                accept="image/*" 
                onChange={handleFileChange} 
              />

              {/* Preview Grid */}
              <div className="row g-2 mb-4">
                {imagePreviews.map((url, index) => (
                  <div className="col-4" key={index}>
                    <div className="product-preview-thumb position-relative">
                      <img src={url} alt="Preview" className="img-fluid rounded" style={{ height: "70px", objectFit: "cover", width: "100%" }} />
                      <button 
                        type="button" 
                        className="thumb-remove btn btn-danger btn-sm position-absolute top-0 end-0 p-1" 
                        style={{ fontSize: "10px", lineHeight: 1 }}
                        onClick={() => removeImage(index)}
                      >
                        <FaXmark size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                type="submit" 
                form="product-form" 
                disabled={isSubmitting} 
                className="btn-primary-custom w-100 py-3 shadow btn btn-primary"
              >
                {isSubmitting ? (
                  <Spinner animation="border" size="sm" className="me-2" />
                ) : (
                  <FaSave className="me-2" />
                )}
                {isSubmitting ? "Saving Product..." : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;