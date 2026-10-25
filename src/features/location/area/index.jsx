import { useMemo, useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { FaMapLocationDot , FaPlus, FaArrowLeft } from 'react-icons/fa6';
import { Spinner } from 'react-bootstrap';
import DataTable from '../../../components/data-table/DataTable';
import TableActionDropdown from '../../../components/data-table/TableActionDropdown';
import ConfirmDeleteModal from '../../../components/ui/Modal/ConfirmDeleteModal';
import { ToastContainer, toast } from 'react-toastify';

import {
  useGetAreasQuery,
  useDeleteAreaMutation,
} from './areaApiSlice';

const AreaList = () => {
  const navigate = useNavigate();

  // Modal state
  const [modal, setModal] = useState({ show: false, id: null, name: '' });

  // RTK Query
  const { data, isLoading, isError, error } = useGetAreasQuery();
  const [deleteArea, { isLoading: isDeleting }] = useDeleteAreaMutation();

  // Modal handlers
  const handleOpenModal = useCallback((id, name) => {
    setModal({ show: true, id, name });
  }, []);

  const handleCloseModal = () => {
    setModal({ show: false, id: null, name: '' });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteArea(modal.id).unwrap();
      toast.success(`${modal.name} deleted successfully`);
      handleCloseModal();
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  // Columns
  const columns = useMemo(() => [
    {
      accessorKey: 'serialNumber',
      header: '#',
      cell: ({ row, table }) => (
        <span>
          #{(table.getState().pagination.pageIndex * table.getState().pagination.pageSize) + row.index + 1}
        </span>
      )
    },
    {
      accessorKey: 'name',
      header: 'Area Name',
      cell: ({ row }) => <strong>{row.original.name}</strong>
    },
    {
      accessorKey: 'country',
      header: 'Country',
      cell: ({ row }) => row.original.country?.name || 'N/A'
    },
    {
      accessorKey: 'state',
      header: 'State',
      cell: ({ row }) => row.original.state?.name || 'N/A'
    },
    {
      accessorKey: 'city',
      header: 'City',
      cell: ({ row }) => row.original.city?.name || 'N/A'
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <TableActionDropdown
          editUrl={`/dashboard/areas/edit/${row.original._id}`}
          onDelete={() => handleOpenModal(row.original._id, row.original.name)}
        />
      )
    }
  ], [handleOpenModal]);

  // Loading
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="grow" />
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="alert alert-danger m-5">
        {error?.data?.message || "Failed to load areas"}
      </div>
    );
  }

  return (
    <div className="main-content-container">
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Delete Modal */}
      <ConfirmDeleteModal
        show={modal.show}
        onHide={handleCloseModal}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Area"
        message={`Are you sure you want to delete "${modal.name}"?`}
      />

      {/* Header */}
      <header className="page-header-box list-header-res">
        <div className="header-title-wrapper">
          <div className="icon-shape"><FaMapLocationDot  size={18} /></div>
          <h4>Area Management</h4>
        </div>

        <div className="header-action-group">
          <button className="btn-back-outline" onClick={() => navigate(-1)}>
            <FaArrowLeft size={14} /> Back
          </button>

          <Link to="/dashboard/areas/add" className="btn-primary-custom no-underline">
            <FaPlus size={14} /> Add Area
          </Link>
        </div>
      </header>

      {/* Table */}
      <div className="content-card p-0 overflow-hidden shadow-sm border-0 mt-3">
        <div className="table-responsive-wrapper">
          <DataTable
            data={data?.areas || data || []}
            columns={columns}
            tableName="areas"
          />
        </div>
      </div>
    </div>
  );
};

export default AreaList;