// import { useMemo, useCallback, useState } from 'react';
// import { useNavigate, Link } from 'react-router'; 
// import { FaBalanceScale, FaPlus, FaArrowLeft } from 'react-icons/fa'; 
// import { Spinner } from 'react-bootstrap';
// import DataTable from '../../components/data-table/DataTable';
// import TableActionDropdown from '../../components/data-table/TableActionDropdown'; 
// import ConfirmDeleteModal from '../../components/ui/Modal/ConfirmDeleteModal';
// import { ToastContainer, toast } from 'react-toastify';

// import { 
//   useGetUnitsQuery, 
//   useDeleteUnitMutation,
//   useToggleUnitStatusMutation 
// } from './unitApiSlice';

// const UnitList = () => {
//   const navigate = useNavigate();

//   // --- 1. MODAL STATE ---
//   const [modal, setModal] = useState({ show: false, id: null, name: '' });

//   // --- 2. RTK QUERY HOOKS ---
//   const { data, isLoading, isError, error } = useGetUnitsQuery();
//   const [deleteUnit, { isLoading: isDeleting }] = useDeleteUnitMutation();
//   const [toggleStatus] = useToggleUnitStatusMutation();

//   // --- 3. MODAL HANDLERS ---
//   const handleOpenModal = useCallback((id, name) => {
//     setModal({ show: true, id, name });
//   }, []);

//   const handleCloseModal = () => {
//     setModal({ show: false, id: null, name: '' });
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await deleteUnit(modal.id).unwrap();
//       toast.success(`"${modal.name}" deleted successfully.`);
//       handleCloseModal();
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to delete unit");
//     }
//   };

//   // --- 4. STATUS TOGGLE ---
//   const handleToggleStatus = useCallback(async (id, currentIsActive) => {
//     try {
//       await toggleStatus({ id, isActive: !currentIsActive }).unwrap();
//       toast.info("Unit status updated successfully", { autoClose: 1000 });
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to update status");
//     }
//   }, [toggleStatus]);

//   // --- 5. COLUMNS DEFINITION ---
//   const columns = useMemo(() => [
//     { 
//       accessorKey: 'serialNumber', 
//       header: '#',
//       cell: ({ row, table }) => (
//         <span className="text-muted fw-medium">
//           #{(table.getState().pagination.pageIndex * table.getState().pagination.pageSize) + row.index + 1}
//         </span>
//       ) 
//     },
//     { 
//       accessorKey: 'name', 
//       header: 'Unit Name',
//       cell: ({ row }) => <span className="fw-bold text-dark">{row.original.name}</span>
//     },
//     { 
//       accessorKey: 'shortName', 
//       header: 'Short Name / Symbol',
//       cell: ({ getValue }) => <span className="badge bg-light text-dark border px-2 py-1">{getValue()}</span>
//     },
//     {
//       accessorKey: 'isActive', 
//       header: 'Active Status',
//       cell: ({ row }) => (
//         <div className="status-switch">
//           <input
//             type="checkbox"
//             id={`switch-${row.original._id}`}
//             checked={row.original.isActive}
//             onChange={() => handleToggleStatus(row.original._id, row.original.isActive)}
//           />
//           <label htmlFor={`switch-${row.original._id}`}></label>
//         </div>
//       )
//     },
//     {
//       id: 'actions',
//       header: 'Action',
//       cell: ({ row }) => (
//         <TableActionDropdown 
//           editUrl={`/dashboard/units/edit/${row.original._id}`}
//           onView={() => console.log("Viewing:", row.original)}
//           onDelete={() => handleOpenModal(row.original._id, row.original.name)}
//         />
//       )
//     }
//   ], [handleOpenModal, handleToggleStatus]);

//   // Handle Loading & Error States
//   if (isLoading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <Spinner animation="grow" variant="primary" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="alert alert-danger m-5">
//         {error?.data?.message || "Server Unreachable"}
//       </div>
//     );
//   }

//   return (
//     <div className="main-content-container">
//       <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
      
//       {/* CONFIRMATION MODAL */}
//       <ConfirmDeleteModal 
//         show={modal.show}
//         onHide={handleCloseModal}
//         onConfirm={handleConfirmDelete}
//         isLoading={isDeleting}
//         title="Delete Measurement Unit"
//         message={`Are you sure you want to delete "${modal.name}"? This action cannot be undone.`}
//       />

//       <header className="page-header-box list-header-res">
//         <div className="header-title-wrapper">
//           <div className="icon-shape"><FaBalanceScale size={18} /></div>
//           <div>
//             <h4 className="mb-0">Measurement Units</h4>
//             <p className="small text-muted mb-0">Manage units for inventory tracking and product variations</p>
//           </div>
//         </div>
        
//         <div className="header-action-group">
//           <button className="btn-back-outline" onClick={() => navigate(-1)}>
//             <FaArrowLeft size={14} /> Back
//           </button>
//           <Link to="/dashboard/units/add" className="btn-primary-custom no-underline">
//             <FaPlus size={14} /> Add New Unit
//           </Link>
//         </div>
//       </header>

//       <div className="content-card p-0 overflow-hidden shadow-sm border-0 mt-3">
//         <div className="table-responsive-wrapper">
//            <DataTable 
//              data={data?.units || data || []} 
//              columns={columns} 
//              tableName="units" 
//            />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UnitList;


import { useMemo, useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router'; 
import { FaBalanceScale, FaPlus, FaArrowLeft } from 'react-icons/fa'; 
import { Spinner } from 'react-bootstrap';
import DataTable from '../../components/data-table/DataTable';
import TableActionDropdown from '../../components/data-table/TableActionDropdown'; 
import ConfirmDeleteModal from '../../components/ui/Modal/ConfirmDeleteModal';
import { ToastContainer, toast } from 'react-toastify';

import { 
  useGetUnitsQuery, 
  useDeleteUnitMutation,
  useToggleUnitStatusMutation 
} from './unitApiSlice';

const UnitList = () => {
  const navigate = useNavigate();

  // --- 1. MODAL STATE ---
  const [modal, setModal] = useState({ show: false, id: null, name: '' });

  // --- 2. RTK QUERY HOOKS ---
  const { data, isLoading, isError, error } = useGetUnitsQuery();
  const [deleteUnit, { isLoading: isDeleting }] = useDeleteUnitMutation();
  const [toggleStatus] = useToggleUnitStatusMutation();

  // --- 3. MODAL HANDLERS ---
  const handleOpenModal = useCallback((id, name) => {
    setModal({ show: true, id, name });
  }, []);

  const handleCloseModal = () => {
    setModal({ show: false, id: null, name: '' });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUnit(modal.id).unwrap();
      toast.success(`"${modal.name}" deleted successfully.`);
      handleCloseModal();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete unit");
    }
  };

  // --- 4. STATUS TOGGLE (Updated to is_active) ---
  const handleToggleStatus = useCallback(async (id, currentIsActive) => {
    try {
      await toggleStatus({ id, is_active: !currentIsActive }).unwrap();
      toast.info("Unit status updated successfully", { autoClose: 1000 });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  }, [toggleStatus]);

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
      header: 'Unit Name',
      cell: ({ row }) => <span className="fw-bold text-dark">{row.original.name}</span>
    },
    { 
      accessorKey: 'short_code', // Updated from shortName
      header: 'Short Code / Symbol',
      cell: ({ getValue }) => <span className="badge bg-light text-dark border px-2 py-1">{getValue()}</span>
    },
    { 
      accessorKey: 'category', // Added Category column mapping
      header: 'Category',
      cell: ({ row }) => (
        <span className="text-secondary fw-semibold">
          {row.original.category?.name || 'N/A'}
        </span>
      )
    },
    {
      accessorKey: 'is_active', // Updated from isActive
      header: 'Active Status',
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
          editUrl={`/dashboard/units/edit/${row.original._id}`}
          onView={() => console.log("Viewing:", row.original)}
          onDelete={() => handleOpenModal(row.original._id, row.original.name)}
        />
      )
    }
  ], [handleOpenModal, handleToggleStatus]);

  // Handle Loading & Error States
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
      
      {/* CONFIRMATION MODAL */}
      <ConfirmDeleteModal 
        show={modal.show}
        onHide={handleCloseModal}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Measurement Unit"
        message={`Are you sure you want to delete "${modal.name}"? This action cannot be undone.`}
      />

      <header className="page-header-box list-header-res">
        <div className="header-title-wrapper">
          <div className="icon-shape"><FaBalanceScale size={18} /></div>
          <div>
            <h4 className="mb-0">Measurement Units</h4>
            <p className="small text-muted mb-0">Manage units for inventory tracking and product variations</p>
          </div>
        </div>
        
        <div className="header-action-group">
          <button className="btn-back-outline" onClick={() => navigate(-1)}>
            <FaArrowLeft size={14} /> Back
          </button>
          <Link to="/dashboard/units/add" className="btn-primary-custom no-underline">
            <FaPlus size={14} /> Add New Unit
          </Link>
        </div>
      </header>

      <div className="content-card p-0 overflow-hidden shadow-sm border-0 mt-3">
        <div className="table-responsive-wrapper">
           <DataTable 
             data={data?.units || data || []} 
             columns={columns} 
             tableName="units" 
           />
        </div>
      </div>
    </div>
  );
};

export default UnitList;