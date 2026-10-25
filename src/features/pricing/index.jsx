


// import { useMemo, useState } from 'react';
// import { Link } from 'react-router'; 
// import { 
//   FaTags, FaPlus, FaCrown, FaCalendarDays, 
//   FaShield, FaCircleInfo, FaIndianRupeeSign 
// } from 'react-icons/fa6'; 
// import DataTable from '../../components/data-table/DataTable';
// import TableActionDropdown from '../../components/data-table/TableActionDropdown'; 
// import { toast, ToastContainer } from 'react-toastify';

// const INITIAL_TIERS = [
//   { _id: "p1", name: "Free Listing", price: 0, validity: "Lifetime", rank: "General", verified: false, isActive: true },
//   { _id: "p2", name: "Silver Verified", price: 1500, validity: "3 Months", rank: "Standard", verified: true, isActive: true },
//   { _id: "p3", name: "Gold Trending", price: 4999, validity: "6 Months", rank: "Top 10", verified: true, isActive: true, isRecommended: true },
//   { _id: "p4", name: "Platinum Elite", price: 12000, validity: "1 Year", rank: "#1 Spot", verified: true, isActive: true }
// ];

// const BusinessTierList = () => {
//   const [data, setData] = useState(INITIAL_TIERS);

//   const handleToggleStatus = (id) => {
//     setData(prev => prev.map(item => 
//       item._id === id ? { ...item, isActive: !item.isActive } : item
//     ));
//     toast.success("Tier visibility updated");
//   };

//   const columns = useMemo(() => [
//     { 
//       accessorKey: 'name', 
//       header: 'Plan Details',
//       cell: ({ row }) => (
//         <div className="d-flex align-items-center gap-3">
//           <div className="feature-icon-badge shadow-sm d-flex align-items-center justify-content-center" 
//                style={{ 
//                  background: 'var(--input-focus-shadow)', 
//                  color: row.original.price > 0 ? '#f59e0b' : '#64748b',
//                  width: '32px', height: '32px', borderRadius: '8px'
//                }}>
//             <FaCrown size={14} />
//           </div>
//           <div>
//             <div className="d-flex align-items-center gap-2">
//                <span className="fw-bold text-dark" style={{fontSize: '0.9rem'}}>{row.original.name}</span>
//                {row.original.verified && <FaShield className="text-primary" size={12} />}
//             </div>
//             {row.original.isRecommended && <span className="badge bg-warning-subtle text-warning border-0" style={{fontSize: '9px'}}>POPULAR</span>}
//           </div>
//         </div>
//       )
//     },
//     { 
//       accessorKey: 'price', 
//       header: 'Pricing',
//       cell: ({ row }) => (
//         <div className="fw-bold text-primary">
//           <FaIndianRupeeSign size={11} /> {row.original.price.toLocaleString('en-IN')}
//           <small className="text-muted fw-normal ms-1" style={{fontSize: '10px'}}>+GST</small>
//         </div>
//       )
//     },
//     { 
//       accessorKey: 'rank', 
//       header: 'Search Priority',
//       cell: ({ row }) => (
//         <span className={`badge ${row.original.rank === '#1 Spot' ? 'bg-success' : 'bg-light text-dark'} border`}>
//           {row.original.rank}
//         </span>
//       )
//     },
//     {
//       accessorKey: 'isActive', 
//       header: 'Visibility',
//       cell: ({ row }) => (
//         <div className="form-check form-switch">
//           <input 
//             className="form-check-input" 
//             type="checkbox" 
//             checked={row.original.isActive} 
//             onChange={() => handleToggleStatus(row.original._id)} 
//           />
//         </div>
//       )
//     },
//     {
//       id: 'actions',
//       header: 'Action',
//       cell: ({ row }) => <TableActionDropdown editUrl={`/dashboard/pricing/edit/${row.original._id}`} />
//     }
//   ], [data]);

//   return (
//     <div className="container-fluid p-4">
//       <ToastContainer position="top-center" autoClose={1500} hideProgressBar />

//       <header className="page-header-box d-flex justify-content-between align-items-center mb-4">
//         <div className="d-flex align-items-center gap-3">
//             <div className="icon-shape bg-white shadow-sm border d-flex align-items-center justify-content-center" 
//                  style={{ color: 'var(--accent-blue)', width: '45px', height: '45px', borderRadius: '10px' }}>
//                 <FaTags size={18} />
//             </div>
//             <div>
//                 <h4 className="mb-0 fw-bold">Business Tiers</h4>
//                 <p className="text-muted small mb-0">Manage ranking and verification plans</p>
//             </div>
//         </div>
//         <Link to="/dashboard/pricing/add" className="btn-primary-custom no-underline">
//           <FaPlus size={12} className="me-2" /> Create Tier
//         </Link>
//       </header>

//       <div className="card shadow-sm border-0 overflow-hidden" style={{ borderRadius: '12px' }}>
//         <DataTable data={data} columns={columns} />
//       </div>
//     </div>
//   );
// };

// export default BusinessTierList;


import { useMemo, useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { FaTags, FaPlus, FaArrowLeft, FaBolt, FaCrown } from 'react-icons/fa6';
import { Spinner } from 'react-bootstrap';
import DataTable from '../../components/data-table/DataTable';
import TableActionDropdown from '../../components/data-table/TableActionDropdown';
import ConfirmDeleteModal from '../../components/ui/Modal/ConfirmDeleteModal';
import { ToastContainer, toast } from 'react-toastify';

import {
  useGetPricingPlansQuery,
  useDeletePricingPlanMutation,
  useUpdatePricingStatusMutation
} from './pricingApiSlice';

const PricingPlanList = () => {
  const navigate = useNavigate();

  // --- 1. MODAL STATE ---
  const [modal, setModal] = useState({ show: false, id: null, name: '' });

  // --- 2. RTK QUERY HOOKS ---
  const { data, isLoading, isError, error } = useGetPricingPlansQuery();
  const [deletePlan, { isLoading: isDeleting }] = useDeletePricingPlanMutation();
  const [updateStatus] = useUpdatePricingStatusMutation();

  // --- 3. MODAL HANDLERS ---
  const handleOpenModal = useCallback((id, name) => {
    setModal({ show: true, id, name });
  }, []);

  const handleCloseModal = () => {
    setModal({ show: false, id: null, name: '' });
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePlan(modal.id).unwrap();
      toast.success(`${modal.name} Plan deleted successfully.`);
      handleCloseModal();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete plan");
    }
  };

  // --- 4. TOGGLE HANDLERS (Status & Recommended) ---
  const handleToggle = useCallback(async (id, field, currentValue) => {
    try {
      await updateStatus({
        id,
        statusData: { [field]: !currentValue }
      }).unwrap();
      toast.info(`${field} updated successfully`, { autoClose: 1000 });
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  }, [updateStatus]);

  // --- 5. COLUMNS DEFINITION ---
  const columns = useMemo(() => [
    {
      accessorKey: 'serialNumber',
      header: '#',
      cell: ({ row, table }) => (
        <span className="text-muted fw-medium">
          #{(table.getState().pagination.pageIndex * table.getState().pagination.pageSize) + row.index + 1}
        </span>
      )
    },
    {
      accessorKey: 'name',
      header: 'Plan Name',
      cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <span className="fw-bold text-dark">{row.original.name}</span>
          {row.original.isRecommended && <FaBolt className="text-warning" title="Recommended" size={14} />}
        </div>
      )
    },
    {
      accessorKey: 'planType',
      header: 'Billing Cycle',
      cell: ({ getValue }) => <span className="badge bg-info-subtle text-info px-2 py-1">{getValue()}</span>
    },
    {
      accessorKey: 'price',
      header: 'Price (₹)',
      cell: ({ row }) => <span className="fw-bold text-primary">₹{row.original.price.toLocaleString()}</span>
    },
    {
      accessorKey: 'isRecommended',
      header: 'Recommended',
      cell: ({ row }) => (
        <div className="status-switch">
          <input
            type="checkbox"
            id={`rec-switch-${row.original._id}`}
            checked={row.original.isRecommended}
            onChange={() => handleToggle(row.original._id, 'isRecommended', row.original.isRecommended)}
          />
          <label htmlFor={`rec-switch-${row.original._id}`}></label>
        </div>
      )
    },
    {
      accessorKey: 'isActive',
      header: 'Active Status',
      cell: ({ row }) => (
        <div className="status-switch">
          <input
            type="checkbox"
            id={`active-switch-${row.original._id}`}
            checked={row.original.isActive}
            onChange={() => handleToggle(row.original._id, 'isActive', row.original.isActive)}
          />
          <label htmlFor={`active-switch-${row.original._id}`}></label>
        </div>
      )
    },

    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <TableActionDropdown
          editUrl={`/dashboard/pricing/edit/${row.original._id}`}
          onView={() => console.log("Viewing Plan:", row.original)}
          onDelete={() => handleOpenModal(row.original._id, row.original.name)}
        />
      )
    }

  ], [handleOpenModal, handleToggle]);

  // Loading & Error States
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger m-5">
        {error?.data?.message || "Server Unreachable"}
      </div>
    );
  }

  return (
    <div className="main-content-container">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />

      <ConfirmDeleteModal
        show={modal.show}
        onHide={handleCloseModal}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Pricing Plan"
        message={`Are you sure you want to delete the "${modal.name}" plan? Businesses using this plan may be affected.`}
      />

      <header className="page-header-box list-header-res">
        <div className="header-title-wrapper">
          <div className="icon-shape bg-primary-subtle text-primary">
            <FaCrown size={18} />
          </div>
          <div>
            <h4 className="mb-0">Pricing Management</h4>
            <p className="text-muted small mb-0">Manage listing packages and subscription tiers</p>
          </div>
        </div>

        <div className="header-action-group">
          <button className="btn-back-outline" onClick={() => navigate(-1)}>
            <FaArrowLeft size={14} /> Back
          </button>
          <Link to="/dashboard/pricing/add" className="btn-primary-custom no-underline">
            <FaPlus size={14} /> Create New Plan
          </Link>
        </div>
      </header>

      <div className="content-card p-0 overflow-hidden shadow-sm border-0 mt-3">
        <div className="table-responsive-wrapper">
          <DataTable
            data={data?.data || data || []}
            columns={columns}
            tableName="pricingPlans"
          />
        </div>
      </div>
    </div>
  );
};

export default PricingPlanList;
