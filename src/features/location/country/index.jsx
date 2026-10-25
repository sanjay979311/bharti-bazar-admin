


import { useMemo, useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { FaGlobe , FaPlus, FaArrowLeft } from 'react-icons/fa6';
import { Spinner } from 'react-bootstrap';
import DataTable from '../../../components/data-table/DataTable';
import TableActionDropdown from '../../../components/data-table/TableActionDropdown';
import ConfirmDeleteModal from '../../../components/ui/Modal/ConfirmDeleteModal';
import { ToastContainer, toast } from 'react-toastify';

import {
  useGetCountriesQuery,
  useDeleteCountryMutation,
} from './countryApiSlice';

const CountryList = () => {
  const navigate = useNavigate();

  // Modal state
  const [modal, setModal] = useState({ show: false, id: null, name: '' });

  // RTK Query
  const { data, isLoading, isError, error } = useGetCountriesQuery();
  const [deleteCountry, { isLoading: isDeleting }] = useDeleteCountryMutation();

  // Modal handlers
  const handleOpenModal = useCallback((id, name) => {
    setModal({ show: true, id, name });
  }, []);

  const handleCloseModal = () => {
    setModal({ show: false, id: null, name: '' });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCountry(modal.id).unwrap();
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
      header: 'Country Name',
      cell: ({ row }) => <strong>{row.original.name}</strong>
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <TableActionDropdown
          editUrl={`/dashboard/countries/edit/${row.original._id}`}
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
        {error?.data?.message || "Failed to load countries"}
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
        title="Delete Country"
        message={`Are you sure you want to delete "${modal.name}"?`}
      />

      {/* Header */}
      <header className="page-header-box list-header-res">
        <div className="header-title-wrapper">
          <div className="icon-shape"><FaGlobe  size={18} /></div>
          <h4>Country Management</h4>
        </div>

        <div className="header-action-group">
          <button className="btn-back-outline" onClick={() => navigate(-1)}>
            <FaArrowLeft size={14} /> Back
          </button>

          <Link to="/dashboard/countries/add" className="btn-primary-custom no-underline">
            <FaPlus size={14} /> Add Country
          </Link>
        </div>
      </header>

      {/* Table */}
      <div className="content-card p-0 overflow-hidden shadow-sm border-0 mt-3">
        <div className="table-responsive-wrapper">
          <DataTable
            data={data?.countries || data || []}
            columns={columns}
            tableName="countries"
          />
        </div>
      </div>
    </div>
  );
};

export default CountryList;
