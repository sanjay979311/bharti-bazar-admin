


import { useMemo, useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router'; 
import { FaLayerGroup, FaPlus, FaArrowLeft, FaImage, FaSitemap } from 'react-icons/fa6'; 
import { Spinner } from 'react-bootstrap';
import DataTable from '../../components/data-table/DataTable';
import TableActionDropdown from '../../components/data-table/TableActionDropdown'; 
import ConfirmDeleteModal from '../../components/ui/Modal/ConfirmDeleteModal';
import { ToastContainer, toast } from 'react-toastify';

import { 
  useGetCategoriesQuery, 
  useDeleteCategoryMutation,
  useToggleCategoryStatusMutation 
} from './categoryApiSlice';

const CategoryList = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // --- 1. MODAL STATE ---
  const [modal, setModal] = useState({ show: false, id: null, name: '' });

  // --- 2. RTK QUERY HOOKS ---
  const { data, isLoading, isError, error } = useGetCategoriesQuery();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const [toggleStatus] = useToggleCategoryStatusMutation();

  // --- 3. MODAL HANDLERS ---
  const handleOpenModal = useCallback((id, name) => {
    setModal({ show: true, id, name });
  }, []);

  const handleCloseModal = () => {
    setModal({ show: false, id: null, name: '' });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCategory(modal.id).unwrap();
      toast.success(`${modal.name} deleted successfully.`);
      handleCloseModal();
    } catch (err) {
      toast.error(err?.data?.message || err?.data?.error || "Failed to delete category");
    }
  };

  // --- 4. STATUS TOGGLE ---
  const handleToggleStatus = useCallback(async (id, currentIsActive) => {
    try {
      await toggleStatus({ id, is_active: !currentIsActive }).unwrap();
      toast.info("Status updated successfully", { autoClose: 1000 });
    } catch (err) {
      toast.error(err?.data?.message || err?.data?.error || "Failed to update status");
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
      accessorKey: 'image', 
      header: 'Image',
      cell: ({ row }) => (
        <div className="rounded overflow-hidden border bg-light shadow-sm" style={{ width: '45px', height: '45px' }}>
          {row.original.image ? (
            <img 
              src={`${BASE_URL}/uploads/${row.original.image}`} 
              alt="category" 
              className="w-100 h-100 object-fit-cover" 
              onError={(e) => { e.target.src = "/image-preview.png"; }}
            />
          ) : (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
              <FaImage size={16} />
            </div>
          )}
        </div>
      )
    },
    { 
      accessorKey: 'name', 
      header: 'Category Name',
      cell: ({ row }) => (
        <div>
          <span className="fw-bold text-dark d-block">{row.original.name}</span>
          <code className="text-muted" style={{ fontSize: '11px' }}>/{row.original.slug}</code>
        </div>
      )
    },
    { 
      accessorKey: 'level', 
      header: 'Level',
      cell: ({ row }) => {
        const lvl = row.original.level || 1;
        const badgeConfig = {
          1: { bg: 'bg-primary-subtle text-primary border border-primary-subtle', label: 'Level 1' },
          2: { bg: 'bg-info-subtle text-info border border-info-subtle', label: 'Level 2' },
          3: { bg: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle', label: 'Level 3' },
        };
        const config = badgeConfig[lvl] || badgeConfig[1];
        return <span className={`badge px-2 py-1 fw-semibold ${config.bg}`}>{config.label}</span>;
      }
    },
    { 
      header: 'Hierarchy Structure',
      cell: ({ row }) => {
        const category = row.original;
        
        if (category.level === 1) {
          return <span className="text-muted small fst-italic">Main Category</span>;
        }

        const parent = category.parent_category;
        if (!parent || typeof parent !== 'object') {
          return <span className="badge bg-danger-subtle text-danger small">Unlinked</span>;
        }

        if (category.level === 2) {
          return (
            <div className="d-flex align-items-center gap-1 small text-dark">
              <FaSitemap size={12} className="text-muted" />
              <span>Main: <strong>{parent.name}</strong></span>
            </div>
          );
        }

        if (category.level === 3) {
          const mainCategory = parent.parent_category;
          return (
            <div className="small lh-sm">
              <div className="fw-semibold text-dark">Sub: {parent.name}</div>
              <div className="text-muted" style={{ fontSize: '11px' }}>
                Main: {mainCategory?.name || 'Top Level'}
              </div>
            </div>
          );
        }
        return null;
      }
    },
    {
      accessorKey: 'is_active', 
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
          editUrl={`/dashboard/categories/edit/${row.original._id}`}
          onView={() => console.log("Viewing:", row.original)}
          onDelete={() => handleOpenModal(row.original._id, row.original.name)}
        />
      )
    }
  ], [handleOpenModal, handleToggleStatus, BASE_URL]);

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
        {error?.data?.message || error?.data?.error || "Server Unreachable"}
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
        title="Delete Category"
        message={`Are you sure you want to delete "${modal.name}"? This action cannot be undone.`}
      />

      {/* PROFESSIONAL HEADER SECTION */}
      <header className="page-header-box list-header-res">
        <div className="header-title-wrapper">
          <div className="icon-shape"><FaLayerGroup size={18} /></div>
          <div>
            <h4 className="mb-0">Category Management</h4>
            <p className="small text-muted mb-0">Manage multi-level programmatic SEO categories</p>
          </div>
        </div>
        
        <div className="header-action-group">
          <button className="btn-back-outline" onClick={() => navigate(-1)}>
            <FaArrowLeft size={14} /> Back
          </button>
          <Link to="/dashboard/categories/add" className="btn-primary-custom no-underline">
            <FaPlus size={14} /> Add Category
          </Link>
        </div>
      </header>

      <div className="content-card p-0 overflow-hidden shadow-sm border-0 mt-3">
        <div className="table-responsive-wrapper">
           <DataTable 
             data={data?.categories || data?.data || data || []} 
             columns={columns} 
             tableName="categories" 
           />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;