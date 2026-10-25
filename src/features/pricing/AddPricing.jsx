



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { toast, ToastContainer } from 'react-toastify';
// import { 
//   FaTags, FaArrowLeft, FaPlus, FaTrash, 
//   FaCircleCheck, FaCircleInfo, FaBolt, FaShield, FaCrown 
// } from 'react-icons/fa6';
// import { FaSave } from 'react-icons/fa';

// const CreateBusinessTier = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     tagline: '',
//     price: 0,
//     validityValue: 1,
//     validityUnit: 'year',
//     searchRank: 'General', 
//     leadLimit: 10,
//     isVerified: false,
//     isRecommended: false,
//     isActive: true,
//   });

//   const [features, setFeatures] = useState(['Business Profile', 'Map Location']);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleFeatureChange = (index, value) => {
//     const newFeatures = [...features];
//     newFeatures[index] = value;
//     setFeatures(newFeatures);
//   };

//   const addFeatureField = () => setFeatures([...features, '']);
//   const removeFeatureField = (index) => setFeatures(features.filter((_, i) => i !== index));

//   return (
//     <div className="container-fluid p-4">
//       <ToastContainer position="top-center" />
      
//       <div className="page-header-box d-flex justify-content-between align-items-center mb-4">
//         <div className="d-flex align-items-center gap-3">
//             <div className="icon-shape bg-white shadow-sm border d-flex align-items-center justify-content-center" 
//                  style={{ color: 'var(--accent-blue)', width: '45px', height: '45px', borderRadius: '10px' }}>
//                 <FaTags size={18} />
//             </div>
//             <div>
//                 <h4 className="mb-0 fw-bold" style={{ color: 'var(--text-main)' }}>Create Business Tier</h4>
//                 <p className="text-muted small mb-0">Define search ranking and verification benefits</p>
//             </div>
//         </div>
//         <button className="btn btn-outline-secondary btn-sm px-3" onClick={() => navigate(-1)}>
//           <FaArrowLeft className="me-1" /> Back
//         </button>
//       </div>

//       <form onSubmit={(e) => e.preventDefault()}>
//         <div className="row g-4">
//           <div className="col-lg-8">
//             <div className="card shadow-sm border-0 p-4 mb-4">
//               <h6 className="fw-bold border-bottom pb-2 mb-4 d-flex align-items-center gap-2">
//                 <FaCrown className="text-warning" size={16}/> Tier Configuration
//               </h6>
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <label className="form-label small fw-bold">Tier Name</label>
//                   <input type="text" name="name" className="form-control" placeholder="e.g. Platinum Elite" onChange={handleInputChange} />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label small fw-bold">Search Priority</label>
//                   <select name="searchRank" className="form-select" onChange={handleInputChange}>
//                     <option value="General">General (Organic)</option>
//                     <option value="Standard">Standard Priority</option>
//                     <option value="Top 10">Top 10 Guaranteed</option>
//                     <option value="#1 Spot">#1 Exclusive Spot</option>
//                   </select>
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label small fw-bold">Investment (₹)</label>
//                   <input type="number" name="price" className="form-control" placeholder="0.00" onChange={handleInputChange} />
//                 </div>

//                 {/* --- CORRECTED VALIDITY SECTION --- */}
//                 <div className="col-md-4">
//                   <label className="form-label small fw-bold">Validity Duration</label>
//                   <div className="d-flex gap-2">
//                     <input 
//                       type="number" 
//                       name="validityValue" 
//                       className="form-control" 
//                       style={{ flex: '1' }} 
//                       defaultValue="1" 
//                       onChange={handleInputChange} 
//                     />
//                     <select 
//                       name="validityUnit" 
//                       className="form-select bg-light" 
//                       style={{ flex: '1.2' }} 
//                       onChange={handleInputChange}
//                     >
//                         <option value="month">Months</option>
//                         <option value="year">Years</option>
//                         <option value="lifetime">Lifetime</option>
//                     </select>
//                   </div>
//                 </div>
//                 {/* --------------------------------- */}

//                 <div className="col-md-4">
//                   <label className="form-label small fw-bold">Monthly Leads</label>
//                   <input type="number" name="leadLimit" className="form-control" placeholder="e.g. 50" onChange={handleInputChange} />
//                 </div>
//               </div>
//             </div>

//             <div className="card shadow-sm border-0 p-4">
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <div>
//                   <h6 className="fw-bold mb-1" style={{ color: 'var(--text-main)' }}>Key Perks</h6>
//                   <p className="text-muted small mb-0">What specific benefits does this tier offer?</p>
//                 </div>
//                 <button type="button" className="btn btn-sm btn-outline-primary px-3" onClick={addFeatureField}>
//                   <FaPlus size={12} className="me-1" /> Add Perk
//                 </button>
//               </div>

//               <div className="feature-grid-builder">
//                 {features.map((feature, index) => (
//                   <div key={index} className="feature-input-wrapper d-flex align-items-center gap-2 mb-3">
//                     <div className="feature-icon-badge">
//                        <FaCircleCheck size={16} />
//                     </div>
//                     <input 
//                       type="text" 
//                       className="form-control border-0 bg-light-subtle shadow-none border-bottom"
//                       style={{ borderRadius: '0', borderBottom: '2px solid var(--border-color)', backgroundColor: 'transparent' }}
//                       value={feature}
//                       placeholder="e.g. Priority SMS Alerts"
//                       onChange={(e) => handleFeatureChange(index, e.target.value)}
//                     />
//                     {features.length > 1 && (
//                       <button type="button" className="btn btn-link text-danger p-0" onClick={() => removeFeatureField(index)}>
//                         <FaTrash size={14} />
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-4">
//             <div className="card shadow-sm border-0 p-4 sticky-top" style={{ top: '24px' }}>
//               <h6 className="fw-bold border-bottom pb-2 mb-4" style={{ color: 'var(--text-main)' }}>Trust & Visibility</h6>
              
//               <div className="form-check form-switch mb-3 d-flex justify-content-between align-items-center px-0">
//                 <div className="d-flex align-items-center gap-2">
//                     <label className="form-check-label fw-semibold small">Verified Badge</label>
//                     <FaShield className="text-primary" size={14} />
//                 </div>
//                 <input className="form-check-input ms-0" type="checkbox" name="isVerified" onChange={handleInputChange} />
//               </div>

//               <div className="form-check form-switch mb-3 d-flex justify-content-between align-items-center px-0">
//                 <div className="d-flex align-items-center gap-2">
//                     <label className="form-check-label fw-semibold small">Popular Tag</label>
//                     <FaBolt className="text-warning" size={12} />
//                 </div>
//                 <input className="form-check-input ms-0" type="checkbox" name="isRecommended" onChange={handleInputChange} />
//               </div>

//               <div className="form-check form-switch mb-4 d-flex justify-content-between align-items-center px-0">
//                 <label className="form-check-label fw-semibold small">Active Status</label>
//                 <input className="form-check-input ms-0" type="checkbox" name="isActive" defaultChecked onChange={handleInputChange} />
//               </div>

//               <div className="bg-light p-3 rounded mb-4 border-start border-4 border-primary">
//                 <p className="small mb-0 text-dark">
//                   <FaCircleInfo className="me-1 text-primary" />
//                   Businesses in this tier will appear in <strong>{formData.searchRank}</strong> results.
//                 </p>
//               </div>

//               <button className="btn-primary-custom w-100 py-3 shadow-sm">
//                 <FaSave className="me-2" /> Save Tier Settings
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateBusinessTier;





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { toast, ToastContainer } from 'react-toastify';
// import { 
//   FaTags, FaArrowLeft, FaPlus, FaTrash, 
//   FaCircleCheck, FaCircleInfo, FaBolt 
// } from 'react-icons/fa6';
// import { FaSave } from 'react-icons/fa';

// const AddPricing = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',          // Plan Name
//     planType: 'Monthly', // Plan Type (Dropdown)
//     price: '',         // Plan Price
//     isRecommended: false,
//     isActive: true,
//   });

//   const [features, setFeatures] = useState(['']);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleFeatureChange = (index, value) => {
//     const newFeatures = [...features];
//     newFeatures[index] = value;
//     setFeatures(newFeatures);
//   };

//   const addFeatureField = () => setFeatures([...features, '']);
//   const removeFeatureField = (index) => setFeatures(features.filter((_, i) => i !== index));

//   const handleSave = async (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.price) {
//       toast.error("Please provide a Plan Name and Price");
//       return;
//     }
    
//     setLoading(true);
//     // Simulate Save
//     console.log("Plan Data:", { ...formData, features });
//     setTimeout(() => {
//       toast.success("Pricing plan saved successfully!");
//       setLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="container-fluid p-4">
//       <ToastContainer position="top-center" />
      
//       {/* Header */}
//       <div className="page-header-box d-flex justify-content-between align-items-center mb-4">
//         <h4 className="mb-0 d-flex align-items-center gap-2">
//           <FaTags className="text-primary" size={20} />
//           Create Pricing Plan
//         </h4>
//         <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
//           <FaArrowLeft className="me-1" /> Back
//         </button>
//       </div>

//       <form onSubmit={handleSave}>
//         <div className="row g-4">
//           <div className="col-lg-8">
//             {/* General Info Card */}
//             <div className="card shadow-sm border-0 p-4 mb-4">
//               <h6 className="fw-bold border-bottom pb-2 mb-4" style={{ color: 'var(--text-main)' }}>Plan Details</h6>
//               <div className="row g-3">
//                 <div className="col-md-12">
//                   <label className="form-label small fw-bold">Plan Name</label>
//                   <input 
//                     type="text" 
//                     name="name" 
//                     className="form-control" 
//                     placeholder="e.g. Platinum Elite" 
//                     value={formData.name}
//                     onChange={handleInputChange} 
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label small fw-bold">Plan Type</label>
//                   <select name="planType" className="form-select" value={formData.planType} onChange={handleInputChange}>
//                     <option value="Monthly">Monthly</option>
//                     <option value="Quarterly">Quarterly</option>
//                     <option value="Half Yearly">Half Yearly</option>
//                     <option value="Yearly">Yearly</option>
//                   </select>
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label small fw-bold">Plan Price (₹)</label>
//                   <input 
//                     type="number" 
//                     name="price" 
//                     className="form-control" 
//                     placeholder="0.00" 
//                     value={formData.price}
//                     onChange={handleInputChange} 
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Features Builder */}
//             <div className="card shadow-sm border-0 p-4">
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <div>
//                   <h6 className="fw-bold mb-1" style={{ color: 'var(--text-main)' }}>Plan Features</h6>
//                   <p className="text-muted small mb-0">List the benefits included in this plan</p>
//                 </div>
//                 <button type="button" className="btn btn-sm btn-outline-primary px-3" onClick={addFeatureField}>
//                   <FaPlus size={12} className="me-1" /> Add Feature
//                 </button>
//               </div>

//               <div className="feature-grid-builder">
//                 {features.map((feature, index) => (
//                   <div key={index} className="feature-input-wrapper d-flex align-items-center gap-2 mb-3">
//                     <div className="feature-icon-badge">
//                        <FaCircleCheck size={16} />
//                     </div>
//                     <input 
//                       type="text" 
//                       className="form-control border-0 bg-light-subtle shadow-none border-bottom"
//                       style={{ 
//                         borderRadius: '0', 
//                         borderBottom: '2px solid var(--border-color)',
//                         backgroundColor: 'transparent'
//                       }}
//                       value={feature}
//                       placeholder="Enter feature description..."
//                       onChange={(e) => handleFeatureChange(index, e.target.value)}
//                     />
//                     {features.length > 1 && (
//                       <button type="button" className="btn btn-link text-danger p-0" onClick={() => removeFeatureField(index)}>
//                         <FaTrash size={14} />
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
              
//               <div className="mt-4 p-3 rounded bg-light border d-flex align-items-center gap-2 text-muted small">
//                 <FaCircleInfo style={{ color: 'var(--accent-blue)' }} />
//                 <span>Tip: Features appear as bullet points on your pricing cards.</span>
//               </div>
//             </div>
//           </div>

//           {/* Settings Sidebar */}
//           <div className="col-lg-4">
//             <div className="card shadow-sm border-0 p-4 sticky-top" style={{ top: '24px' }}>
//               <h6 className="fw-bold border-bottom pb-2 mb-4" style={{ color: 'var(--text-main)' }}>Plan Settings</h6>
              
//               <div className="form-check form-switch mb-3 d-flex justify-content-between align-items-center px-0">
//                 <div className="d-flex align-items-center gap-2">
//                     <label className="form-check-label fw-semibold small">Recommended</label>
//                     <FaBolt className="text-warning" size={12} />
//                 </div>
//                 <input className="form-check-input ms-0" type="checkbox" name="isRecommended" checked={formData.isRecommended} onChange={handleInputChange} />
//               </div>

//               <div className="form-check form-switch mb-4 d-flex justify-content-between align-items-center px-0">
//                 <label className="form-check-label fw-semibold small">Active Status</label>
//                 <input className="form-check-input ms-0" type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} />
//               </div>

//               <hr className="my-4" style={{ borderColor: 'var(--border-color)' }} />

//               <button 
//                 type="submit" 
//                 className="btn-primary-custom w-100 py-3 shadow-sm border-0"
//                 disabled={loading}
//               >
//                 <FaSave className="me-2" /> {loading ? 'Saving...' : 'Save Pricing Plan'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddPricing;



import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { 
  FaTags, FaArrowLeft, FaPlus, FaTrash, 
  FaCircleCheck, FaCircleInfo, FaBolt 
} from 'react-icons/fa6';
import { FaSave } from 'react-icons/fa';

// 1. Import the mutation hook from your slice
import { useCreatePricingPlanMutation } from './pricingApiSlice';

const AddPricing = () => {
  const navigate = useNavigate();
  
  // 2. Initialize the mutation hook
  const [createPricingPlan, { isLoading }] = useCreatePricingPlanMutation();

  const [formData, setFormData] = useState({
    name: '',
    planType: 'Monthly',
    price: '',
    isRecommended: false,
    isActive: true,
  });

  const [features, setFeatures] = useState(['']);

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

  // 3. Update handleSave to use the mutation
  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      toast.error("Please provide a Plan Name and Price");
      return;
    }

    try {
      // Filter out empty feature strings before sending
      const cleanFeatures = features.filter(f => f.trim() !== "");
      
      const payload = {
        ...formData,
        features: cleanFeatures
      };

      // Trigger the mutation
      const res = await createPricingPlan(payload).unwrap();
      
      toast.success(res.message || "Pricing plan saved successfully!",{position:"top-center"});
      setTimeout(() => {
        navigate('/dashboard/pricing');
      }, 500);
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Failed to save plan",{position:"top-center"});
    }
  };

  return (
    <div className="container-fluid p-4">
      <ToastContainer position="top-center" />
      
      <div className="page-header-box d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 d-flex align-items-center gap-2">
          <FaTags className="text-primary" size={20} />
          Create Pricing Plan
        </h4>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </button>
      </div>

      <form onSubmit={handleSave}>
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
                    placeholder="e.g. Platinum Elite" 
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
                    placeholder="0.00" 
                    value={formData.price}
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0 p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-main)' }}>Plan Features</h6>
                  <p className="text-muted small mb-0">List the benefits included in this plan</p>
                </div>
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
                      style={{ 
                        borderRadius: '0', 
                        borderBottom: '2px solid var(--border-color)',
                        backgroundColor: 'transparent'
                      }}
                      value={feature}
                      placeholder="Enter feature description..."
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
                disabled={isLoading}
              >
                <FaSave className="me-2" /> {isLoading ? 'Saving...' : 'Save Pricing Plan'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPricing;
