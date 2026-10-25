import React, { useMemo, useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router'; 
import { FaTags, FaPlus, FaArrowLeft } from 'react-icons/fa'; 
import { Spinner } from 'react-bootstrap';
import DataTable from '../../components/data-table/DataTable';
import TableActionDropdown from '../../components/data-table/TableActionDropdown'; 
import ConfirmDeleteModal from '../../components/ui/Modal/ConfirmDeleteModal';
import { ToastContainer, toast } from 'react-toastify';

import { 
  useGetKeywordTagsQuery, 
  useDeleteKeywordTagMutation
} from './keywordTagApiSlice';

const KeywordTagList = () => {
  const navigate = useNavigate();

  // --- 1. MODAL STATE ---
  const [modal, setModal] = useState({ show: false, id: null, name: '' });

  // --- 2. RTK QUERY HOOKS ---
  const { data, isLoading, isError, error } = useGetKeywordTagsQuery();
  const [deleteKeywordTag, { isLoading: isDeleting }] = useDeleteKeywordTagMutation();

  // --- 3. MODAL HANDLERS ---
  const handleOpenModal = useCallback((id, name) => {
    setModal({ show: true, id, name });
  }, []);

  const handleCloseModal = () => {
    setModal({ show: false, id: null, name: '' });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteKeywordTag(modal.id).unwrap();
      toast.success(`"${modal.name}" deleted successfully.`);
      handleCloseModal();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete keyword tag");
    }
  };

  // --- 4. COLUMNS DEFINITION ---
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
      accessorKey: 'keyword', 
      header: 'Keyword & Slug',
      cell: ({ row }) => (
        <div>
          <span className="fw-bold text-dark d-block text-capitalize">{row.original.keyword}</span>
          <small className="text-muted" style={{ fontSize: "11px" }}>slug: {row.original.slug}</small>
        </div>
      )
    },
    { 
      accessorKey: 'category_id', 
      header: 'Linked Category',
      cell: ({ row }) => (
        <span className="badge bg-light text-dark border">
          {row.original.category_id?.name || "Unlinked"}
        </span>
      )
    },
    { 
      accessorKey: 'default_unit', 
      header: 'Default Unit',
      cell: ({ row }) => (
        <span className="fw-medium text-secondary">
          {row.original.default_unit?.name ? `${row.original.default_unit.name} (${row.original.default_unit.short_code})` : "N/A"}
        </span>
      )
    },
    { 
      accessorKey: 'target_hubs', 
      header: 'Target Hubs / Mandis',
      cell: ({ row }) => {
        const hubs = row.original.target_hubs;
        if (!hubs || hubs.length === 0) return <span className="text-muted small">None</span>;
        return (
          <div className="d-flex flex-wrap gap-1" style={{ maxWidth: "200px" }}>
            {hubs.map((hub, idx) => (
              <span key={idx} className="badge bg-secondary" style={{ fontSize: "10px" }}>
                {hub}
              </span>
            ))}
          </div>
        );
      }
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <TableActionDropdown 
          editUrl={`/dashboard/keyword-tags/edit/${row.original._id}`}
          onView={() => console.log("Viewing:", row.original)}
          onDelete={() => handleOpenModal(row.original._id, row.original.keyword)}
        />
      )
    }
  ], [handleOpenModal]);

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

  // Safe Extraction of List Array
  const keywordTagsList = Array.isArray(data) 
    ? data 
    : data?.keywordTags || data?.tags || data?.data || [];

  return (
    <div className="main-content-container">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
      
      {/* CONFIRMATION MODAL */}
      <ConfirmDeleteModal 
        show={modal.show}
        onHide={handleCloseModal}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Keyword Tag"
        message={`Are you sure you want to delete "${modal.name}"? This action cannot be undone.`}
      />

      <header className="page-header-box list-header-res">
        <div className="header-title-wrapper">
          <div className="icon-shape"><FaTags size={18} /></div>
          <div>
            <h4 className="mb-0">Keyword Tags</h4>
            <p className="small text-muted mb-0">Manage keyword tags for product search and filtration</p>
          </div>
        </div>
        
        <div className="header-action-group">
          <button className="btn-back-outline" onClick={() => navigate(-1)}>
            <FaArrowLeft size={14} /> Back
          </button>
          <Link to="/dashboard/keyword-tags/add" className="btn-primary-custom no-underline">
            <FaPlus size={14} /> Add New Tag
          </Link>
        </div>
      </header>

      <div className="content-card p-0 overflow-hidden shadow-sm border-0 mt-3">
        <div className="table-responsive-wrapper">
           <DataTable 
             data={keywordTagsList} 
             columns={columns} 
             tableName="keyword-tags" 
           />
        </div>
      </div>
    </div>
  );
};

export default KeywordTagList;