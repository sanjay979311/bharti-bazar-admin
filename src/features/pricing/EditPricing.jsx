// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { FaArrowLeft, FaTags, FaCircleCheck, FaTrash } from 'react-icons/fa6';
// import { toast, ToastContainer } from 'react-toastify';

// const AddPricing = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   // Form State
//   const [formData, setFormData] = useState({
//     name: '',
//     tagline: '',
//     price: 0,
//     billingCycle: 'month',
//     limit: 10,
//     unlimited: false,
//     isRecommended: false,
//     isActive: true,
//   });

//   // Features List State
//   const [features, setFeatures] = useState(['']);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // Feature Handlers
//   const handleFeatureChange = (index, value) => {
//     const newFeatures = [...features];
//     newFeatures[index] = value;
//     setFeatures(newFeatures);
//   };

//   const addFeatureField = () => setFeatures([...features, '']);
//   const removeFeatureField = (index) => setFeatures(features.filter((_, i) => i !== index));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const finalData = { ...formData, features: features.filter(f => f.trim() !== '') };

//     // Simulate API Call
//     console.log("Submitting Plan:", finalData);
//     setTimeout(() => {
//       toast.success("Pricing Plan Created!");
//       setLoading(false);
//       navigate('/dashboard/pricing');
//     }, 1000);
//   };

//   return (
//     <div className="main-content-container">
//       <ToastContainer position="top-center" />

//       <header className="page-header-box">
//         <div className="header-title-wrapper">
//           <div className="icon-shape"><FaTags size={18} /></div>
//           <h4>Create New Pricing Plan</h4>
//         </div>
//         <button className="btn-back-outline" onClick={() => navigate(-1)}>
//           <FaArrowLeft size={14} /> Back to List
//         </button>
//       </header>

//       <form onSubmit={handleSubmit} className="mt-4">
//         <div className="row">
//           {/* Left Column: Basic Info */}
//           <div className="col-lg-8">
//             <div className="content-card shadow-sm mb-4">
//               <h5 className="mb-4">Plan Details</h5>

//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <label className="form-label fw-bold">Plan Name</label>
//                   <input 
//                     type="text" 
//                     name="name"
//                     className="form-control text-field-custom" 
//                     placeholder="e.g. Professional"
//                     required
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label fw-bold">Tagline</label>
//                   <input 
//                     type="text" 
//                     name="tagline"
//                     className="form-control text-field-custom" 
//                     placeholder="e.g. Best for small teams"
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="col-md-4">
//                   <label className="form-label fw-bold">Price ($)</label>
//                   <input 
//                     type="number" 
//                     name="price"
//                     className="form-control text-field-custom" 
//                     min="0"
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label fw-bold">Billing Cycle</label>
//                   <select name="billingCycle" className="form-select text-field-custom" onChange={handleInputChange}>
//                     <option value="month">Per Month</option>
//                     <option value="year">Per Year</option>
//                     <option value="one-time">One Time</option>
//                   </select>
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label fw-bold">Listing Limit</label>
//                   <input 
//                     type="number" 
//                     name="limit"
//                     className="form-control text-field-custom" 
//                     disabled={formData.unlimited}
//                     placeholder={formData.unlimited ? "∞" : "10"}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="content-card shadow-sm">
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h5 className="mb-0">Features Included</h5>
//                 <button type="button" className="btn btn-sm btn-outline-primary" onClick={addFeatureField}>
//                   + Add Feature
//                 </button>
//               </div>

//               {features.map((feature, index) => (
//                 <div key={index} className="d-flex gap-2 mb-2">
//                   <div className="input-group">
//                     <span className="input-group-text bg-light border-end-0">
//                       <FaCircleCheck className="text-success" size={14} />
//                     </span>
//                     <input 
//                       type="text" 
//                       className="form-control border-start-0 text-field-custom"
//                       value={feature}
//                       placeholder="Enter a feature..."
//                       onChange={(e) => handleFeatureChange(index, e.target.value)}
//                     />
//                   </div>
//                   {features.length > 1 && (
//                     <button type="button" className="btn btn-outline-danger" onClick={() => removeFeatureField(index)}>
//                       <FaTrash size={14} />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Column: Settings */}
//           <div className="col-lg-4">
//             <div className="content-card shadow-sm sticky-top" style={{ top: '20px' }}>
//               <h5 className="mb-4">Plan Settings</h5>

//               <div className="form-check form-switch mb-3">
//                 <input 
//                   className="form-check-input" 
//                   type="checkbox" 
//                   name="unlimited" 
//                   id="unlimitedSwitch" 
//                   onChange={handleInputChange} 
//                 />
//                 <label className="form-check-label fw-medium" htmlFor="unlimitedSwitch">Unlimited Listings</label>
//               </div>

//               <div className="form-check form-switch mb-3">
//                 <input 
//                   className="form-check-input" 
//                   type="checkbox" 
//                   name="isRecommended" 
//                   id="recSwitch" 
//                   onChange={handleInputChange} 
//                 />
//                 <label className="form-check-label fw-medium" htmlFor="recSwitch">Mark as Recommended</label>
//               </div>

//               <div className="form-check form-switch mb-4">
//                 <input 
//                   className="form-check-input" 
//                   type="checkbox" 
//                   name="isActive" 
//                   id="activeSwitch" 
//                   defaultChecked 
//                   onChange={handleInputChange} 
//                 />
//                 <label className="form-check-label fw-medium" htmlFor="activeSwitch">Status Active</label>
//               </div>

//               <hr />

//               <button 
//                 type="submit" 
//                 className="btn btn-primary w-100 py-2 fw-bold" 
//                 disabled={loading}
//               >
//                 {loading ? 'Creating...' : 'Create Pricing Plan'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddPricing;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import {
  FaTags, FaArrowLeft, FaPlus, FaTrash,
  FaCircleCheck, FaBolt, FaPenToSquare
} from 'react-icons/fa6';
import { FaSave } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';

// Import hooks from your slice
import {
  useGetPricingPlanByIdQuery,
  useUpdatePricingPlanMutation
} from './pricingApiSlice';

const EditPricing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Fetch existing data
  const { data: planData, isLoading: isFetching, isError } = useGetPricingPlanByIdQuery(id);

  // 2. Initialize update mutation
  const [updatePricingPlan, { isLoading: isUpdating }] = useUpdatePricingPlanMutation();

  const [formData, setFormData] = useState({
    name: '',
    planType: 'Monthly',
    price: '',
    isRecommended: false,
    isActive: true,
  });

  const [features, setFeatures] = useState(['']);

  // 3. Populate form when data is received
  useEffect(() => {
    if (planData?.data) {
      const plan = planData.data;
      setFormData({
        name: plan.name || '',
        planType: plan.planType || 'Monthly',
        price: plan.price || '',
        isRecommended: plan.isRecommended || false,
        isActive: plan.isActive || false,
      });
      setFeatures(plan.features?.length > 0 ? plan.features : ['']);
    }
  }, [planData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeatureField = () => setFeatures([...features, '']);
  const removeFeatureField = (index) => setFeatures(features.filter((_, i) => i !== index));

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      toast.error("Please provide a Plan Name and Price");
      return;
    }

    try {
      const cleanFeatures = features.filter(f => f.trim() !== "");

      const payload = {
        id,
        ...formData,
        features: cleanFeatures
      };

      const res = await updatePricingPlan(payload).unwrap();

      toast.success(res.message || "Pricing plan updated successfully!", { position: "top-center" });
      setTimeout(() => {
        navigate('/dashboard/pricing');
      }, 500);
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Failed to update plan", { position: "top-center" });
    }
  };

  if (isFetching) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (isError) {
    return <div className="alert alert-danger m-4">Error loading plan details.</div>;
  }

  return (
    <div className="container-fluid p-4">
      <ToastContainer position="top-center" />

      <div className="page-header-box d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 d-flex align-items-center gap-2">
          <FaPenToSquare className="text-primary" size={20} />
          Edit Pricing Plan
        </h4>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </button>
      </div>

      <form onSubmit={handleUpdate}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 p-4 mb-4">
              <h6 className="fw-bold border-bottom pb-2 mb-4" style={{ color: 'var(--text-main)' }}>Plan Details</h6>
              <div className="row g-3">
                <div className="col-md-12">
                  <label className="form-label small fw-bold">Plan Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Plan Type</label>
                  <select name="planType" className="form-select" value={formData.planType} onChange={handleInputChange}>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half Yearly">Half Yearly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Lifetime">Lifetime</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Plan Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0 p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="fw-bold mb-1" style={{ color: 'var(--text-main)' }}>Plan Features</h6>
                <button type="button" className="btn btn-sm btn-outline-primary px-3" onClick={addFeatureField}>
                  <FaPlus size={12} className="me-1" /> Add Feature
                </button>
              </div>

              <div className="feature-grid-builder">
                {features.map((feature, index) => (
                  <div key={index} className="feature-input-wrapper d-flex align-items-center gap-2 mb-3">
                    <div className="feature-icon-badge">
                      <FaCircleCheck size={16} />
                    </div>
                    <input
                      type="text"
                      className="form-control border-0 bg-light-subtle shadow-none border-bottom"
                      style={{ borderRadius: '0', borderBottom: '2px solid var(--border-color)', backgroundColor: 'transparent' }}
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                    />
                    {features.length > 1 && (
                      <button type="button" className="btn btn-link text-danger p-0" onClick={() => removeFeatureField(index)}>
                        <FaTrash size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm border-0 p-4 sticky-top" style={{ top: '24px' }}>
              <h6 className="fw-bold border-bottom pb-2 mb-4" style={{ color: 'var(--text-main)' }}>Plan Settings</h6>

              <div className="form-check form-switch mb-3 d-flex justify-content-between align-items-center px-0">
                <div className="d-flex align-items-center gap-2">
                  <label className="form-check-label fw-semibold small">Recommended</label>
                  <FaBolt className="text-warning" size={12} />
                </div>
                <input className="form-check-input ms-0" type="checkbox" name="isRecommended" checked={formData.isRecommended} onChange={handleInputChange} />
              </div>

              <div className="form-check form-switch mb-4 d-flex justify-content-between align-items-center px-0">
                <label className="form-check-label fw-semibold small">Active Status</label>
                <input className="form-check-input ms-0" type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} />
              </div>

              <hr className="my-4" style={{ borderColor: 'var(--border-color)' }} />

              <button
                type="submit"
                className="btn-primary-custom w-100 py-3 shadow-sm border-0"
                disabled={isUpdating}
              >
                <FaSave className="me-2" /> {isUpdating ? 'Updating...' : 'Update Pricing Plan'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPricing;
