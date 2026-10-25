



// import React, { useMemo, useCallback } from 'react';
// import { useNavigate, Link } from 'react-router';
// import { FaBoxOpen, FaPlus, FaArrowLeft, FaImage } from 'react-icons/fa6'; 
// import DataTable from '../../components/data-table/DataTable';
// import TableActionDropdown from '../../components/data-table/TableActionDropdown'; 
// import { ToastContainer, toast } from 'react-toastify';

// // RTK Query Hook
// import { useGetProductsQuery,useDeleteProductMutation ,useUpdateProductStatusMutation} from './productApiSlice';

// const ProductList = () => {
//   const navigate = useNavigate();

//   // --- RTK Query Hook Integration ---
//   const { data: apiResponse, isLoading, isError, error, refetch } = useGetProductsQuery();

//   // --- Safe Data Extraction based on your API response structure ---
//   const products = apiResponse?.products || apiResponse?.data || [];

//   // --- Handle Status Toggle (Active/Inactive) ---
//   const handleToggleStatus = useCallback(async (id, currentStatus) => {
//     try {
//       const response = await fetch(`/api/product/status/${id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ is_active: !currentStatus })
//       });
      
//       const data = await response.json();
//       if (response.ok && data.success) {
//         toast.info("Product visibility updated successfully");
//         refetch(); // RTK Query cache refetch
//       } else {
//         toast.error(data.message || "Status update failed");
//       }
//     } catch (err) {
//       toast.error("Status update failed");
//     }
//   }, [refetch]);

//   // --- Handle Delete ---
//   const handleDelete = useCallback(async (id, name) => {
//     if (window.confirm(`Permanently delete ${name}?`)) {
//       try {
//         const response = await fetch(`/api/product/remove/${id}`, { method: 'DELETE' });
//         const data = await response.json();
        
//         if (response.ok && data.success) {
//           toast.success("Product removed from inventory");
//           refetch(); // RTK Query cache refetch
//         } else {
//           toast.error(data.message || "Error deleting product");
//         }
//       } catch (err) {
//         toast.error("Error deleting product");
//       }
//     }
//   }, [refetch]);

//   // --- DataTable Columns Definition ---
//   const columns = useMemo(() => [
//     { 
//       accessorKey: 'image', 
//       header: 'Product',
//       cell: ({ row }) => (
//         <div className="d-flex align-items-center gap-3">
//           <div className="table-img-container">
//             {row.original.images?.[0] ? (
//               <img src={row.original.images[0]} alt={row.original.product_name} className="table-thumb" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} />
//             ) : (
//               <div className="table-thumb-placeholder bg-light text-muted d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', borderRadius: '6px' }}><FaImage /></div>
//             )}
//           </div>
//           <div className="d-flex flex-column">
//             <span className="fw-bold text-main">{row.original.product_name}</span>
//             <small className="text-muted">City: {row.original.location?.city || 'N/A'}{row.original.location?.market_area ? `, ${row.original.location.market_area}` : ''}</small>
//           </div>
//         </div>
//       )
//     },
//     { 
//       accessorKey: 'category', 
//       header: 'Category',
//       cell: ({ row }) => (
//         <span className="badge bg-light text-primary border">
//           {row.original.category?.name || 'Uncategorized'}
//         </span>
//       )
//     },
//     { 
//       accessorKey: 'price', 
//       header: 'Price / Unit',
//       cell: ({ row }) => (
//         <span className="fw-semibold text-dark">
//           ₹{row.original.price?.toLocaleString()} / <small className="text-muted">{row.original.unit?.short_code || 'unit'}</small>
//         </span>
//       )
//     },
//     { 
//       accessorKey: 'min_order_quantity', 
//       header: 'Min Qty',
//       cell: ({ getValue }) => <span className="fw-medium text-secondary">{getValue() || 1}</span>
//     },
//     {
//       accessorKey: 'is_active',
//       header: 'Visibility',
//       cell: ({ row }) => (
//         <div className="status-switch form-check form-switch">
//           <input
//             className="form-check-input"
//             type="checkbox"
//             role="switch"
//             id={`switch-${row.original._id}`}
//             checked={row.original.is_active}
//             onChange={() => handleToggleStatus(row.original._id, row.original.is_active)}
//             style={{ cursor: 'pointer' }}
//           />
//           <label className="form-check-label" htmlFor={`switch-${row.original._id}`}></label>
//         </div>
//       )
//     },
//     {
//       id: 'actions',
//       header: 'Action',
//       cell: ({ row }) => (
//         <TableActionDropdown 
//           editUrl={`/dashboard/products/edit/${row.original._id}`}
//           onView={() => navigate(`/dashboard/products/view/${row.original._id}`)}
//           onDelete={() => handleDelete(row.original._id, row.original.product_name)}
//         />
//       )
//     }
//   ], [handleToggleStatus, handleDelete, navigate]);

//   // --- Loading State ---
//   if (isLoading) {
//     return (
//       <div className="p-5 text-center">
//         <span className="spinner-border text-primary" role="status"></span>
//         <p className="text-muted small mt-2">Loading inventory...</p>
//       </div>
//     );
//   }

//   // --- Error State ---
//   if (isError) {
//     return (
//       <div className="p-5 text-center text-danger">
//         <p>Failed to load products: {error?.data?.message || error?.error || "Server error"}</p>
//         <button className="btn btn-outline-primary btn-sm mt-2" onClick={refetch}>Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div className="main-content-container">
//       <ToastContainer position="top-center" autoClose={2000} />
      
//       <header className="page-header-box list-header-res d-flex justify-content-between align-items-center mb-4">
//         <div className="header-title-wrapper d-flex align-items-center gap-3">
//           <div className="icon-shape bg-soft-primary p-3 rounded bg-light text-primary">
//             <FaBoxOpen size={20} />
//           </div>
//           <div>
//             <h4 className="mb-0">Product Inventory</h4>
//             <p className="small text-muted mb-0">Manage your product pricing, categories, and marketplace locations</p>
//           </div>
//         </div>
        
//         <div className="header-action-group d-flex gap-2">
//           <button className="btn btn-outline-secondary btn-back-outline d-flex align-items-center gap-2" onClick={() => navigate(-1)}>
//             <FaArrowLeft size={14} /> Back
//           </button>
//           <Link to="/dashboard/product-add" className="btn btn-primary btn-primary-custom no-underline d-flex align-items-center gap-2">
//             <FaPlus size={14} /> New Product
//           </Link>
//         </div>
//       </header>

//       <div className="content-card p-0 overflow-hidden shadow-sm border-0 bg-white rounded">
//         <div className="table-responsive-wrapper">
//            <DataTable 
//              data={products} 
//              columns={columns} 
//              tableName="products" 
//            />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;


import { useMemo, useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router'; 
import { FaBoxOpen, FaPlus, FaArrowLeft, FaImage } from 'react-icons/fa6'; 
import { Spinner } from 'react-bootstrap';
import DataTable from '../../components/data-table/DataTable';
import TableActionDropdown from '../../components/data-table/TableActionDropdown'; 
import ConfirmDeleteModal from '../../components/ui/Modal/ConfirmDeleteModal';
import { ToastContainer, toast } from 'react-toastify';

// RTK Query Hooks
import { 
  useGetProductsQuery, 
  useDeleteProductMutation, 
  useUpdateProductStatusMutation 
} from './productApiSlice';

const ProductList = () => {
  const navigate = useNavigate();

  // --- 1. MODAL STATE ---
  const [modal, setModal] = useState({ show: false, id: null, name: '' });

  // --- 2. RTK QUERY HOOKS ---
  const { data: apiResponse, isLoading, isError, error, refetch } = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [updateStatus] = useUpdateProductStatusMutation();

  // --- Safe Data Extraction ---
  const products = apiResponse?.products || apiResponse?.data || [];

  // --- 3. MODAL HANDLERS ---
  const handleOpenModal = useCallback((id, name) => {
    setModal({ show: true, id, name });
  }, []);

  const handleCloseModal = () => {
    setModal({ show: false, id: null, name: '' });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(modal.id).unwrap();
      toast.success(`"${modal.name}" removed from inventory.`);
      handleCloseModal();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err?.data?.error || "Error deleting product");
    }
  };

  // --- 4. STATUS TOGGLE ---
  const handleToggleStatus = useCallback(async (id, currentIsActive) => {
    try {
      await updateStatus({ id, statusData: { is_active: !currentIsActive } }).unwrap();
      toast.info("Product visibility updated successfully", { autoClose: 1000 });
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err?.data?.error || "Status update failed");
    }
  }, [updateStatus, refetch]);

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
      accessorKey: 'image', 
      header: 'Product',
      cell: ({ row }) => (
        <div className="d-flex align-items-center gap-3">
          <div className="table-img-container rounded overflow-hidden border bg-light shadow-sm" style={{ width: '45px', height: '45px' }}>
            {row.original.images?.[0] ? (
              <img 
                src={row.original.images[0]} 
                alt={row.original.product_name} 
                className="w-100 h-100 object-fit-cover" 
                onError={(e) => { e.target.src = "/image-preview.png"; }}
              />
            ) : (
              <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                <FaImage size={16} />
              </div>
            )}
          </div>
          <div className="d-flex flex-column">
            <span className="fw-bold text-dark">{row.original.product_name}</span>
            <small className="text-muted">City: {row.original.location?.city || 'N/A'}{row.original.location?.market_area ? `, ${row.original.location.market_area}` : ''}</small>
          </div>
        </div>
      )
    },
    { 
      accessorKey: 'category', 
      header: 'Category',
      cell: ({ row }) => (
        <span className="badge bg-light text-primary border">
          {row.original.category?.name || 'Uncategorized'}
        </span>
      )
    },
    { 
      accessorKey: 'price', 
      header: 'Price / Unit',
      cell: ({ row }) => (
        <span className="fw-semibold text-dark">
          ₹{row.original.price?.toLocaleString()} / <small className="text-muted">{row.original.unit?.short_code || 'unit'}</small>
        </span>
      )
    },
    { 
      accessorKey: 'min_order_quantity', 
      header: 'Min Qty',
      cell: ({ getValue }) => <span className="fw-medium text-secondary">{getValue() || 1}</span>
    },
    {
      accessorKey: 'is_active',
      header: 'Visibility',
      cell: ({ row }) => (
        <div className="status-switch">
          <input
            type="checkbox"
            id={`switch-${row.original._id}`}
            checked={row.original.is_active}
            onChange={() => handleToggleStatus(row.original._id, row.original.is_active)}
          />
          <label htmlFor={`switch-${row.original._id}`}></label>
        </div>
      )
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <TableActionDropdown 
          editUrl={`/dashboard/products/edit/${row.original._id}`}
          onView={() => navigate(`/dashboard/products/view/${row.original._id}`)}
          onDelete={() => handleOpenModal(row.original._id, row.original.product_name)}
        />
      )
    }
  ], [handleOpenModal, handleToggleStatus, navigate]);

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <div className="alert alert-danger m-5">
        {error?.data?.message || error?.error || "Failed to load products"}
      </div>
    );
  }

  return (
    <div className="main-content-container">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
      
      {/* CONFIRMATION MODAL */}
      <ConfirmDeleteModal 
        show={modal.show}
        onHide={handleCloseModal}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Product"
        message={`Are you sure you want to delete "${modal.name}"? This action cannot be undone.`}
      />

      {/* PROFESSIONAL HEADER SECTION */}
      <header className="page-header-box list-header-res">
        <div className="header-title-wrapper">
          <div className="icon-shape"><FaBoxOpen size={18} /></div>
          <div>
            <h4 className="mb-0">Product Inventory</h4>
            <p className="small text-muted mb-0">Manage your product pricing, categories, and marketplace locations</p>
          </div>
        </div>
        
        <div className="header-action-group">
          <button className="btn-back-outline" onClick={() => navigate(-1)}>
            <FaArrowLeft size={14} /> Back
          </button>
          <Link to="/dashboard/products/add" className="btn-primary-custom no-underline">
            <FaPlus size={14} /> New Product
          </Link>
        </div>
      </header>

      <div className="content-card p-0 overflow-hidden shadow-sm border-0 mt-3 bg-white rounded">
        <div className="table-responsive-wrapper">
           <DataTable 
             data={products} 
             columns={columns} 
             tableName="products" 
           />
        </div>
      </div>
    </div>
  );
};

export default ProductList;