import { useMemo, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router';
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import { FaUsers, FaPlus, FaArrowLeft } from 'react-icons/fa6'; 
import DataTable from '../../data-table/DataTable';

const INITIAL_USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', status: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 987 654 321', status: true },
  { id: 3, name: 'Robert Fox', email: 'robert@dev.com', phone: '+1 555 012 345', status: false },
  { id: 4, name: 'Sarah Wilson', email: 'sarah.w@web.com', phone: '+1 444 888 999', status: true },
  { id: 5, name: 'Michael Brown', email: 'mbrown@tech.com', phone: '+44 20 7946 0958', status: true },
  { id: 6, name: 'Emily Davis', email: 'emily.d@service.com', phone: '+61 2 9876 5432', status: true },
  { id: 7, name: 'Chris Evans', email: 'chris.e@cloud.com', phone: '+1 333 222 111', status: false },
  { id: 8, name: 'Jessica Alba', email: 'jess@design.com', phone: '+1 777 666 555', status: true },
  { id: 9, name: 'David Miller', email: 'dmiller@data.com', phone: '+49 30 123456', status: true },
  { id: 10, name: 'Lisa Ray', email: 'lisa.r@hr.com', phone: '+91 98765 43210', status: true },
  { id: 11, name: 'Kevin Hart', email: 'kevin@comedy.com', phone: '+1 123 999 000', status: true },
  { id: 12, name: 'Anna Joy', email: 'ajoy@edu.com', phone: '+1 888 777 666', status: false },
  { id: 13, name: 'Tom Hardy', email: 'tom@film.com', phone: '+44 7700 900000', status: true },
  { id: 14, name: 'Bruce Wayne', email: 'bruce@wayne.com', phone: '+1 000 000 000', status: true },
  { id: 15, name: 'Clark Kent', email: 'clark@dailyplanet.com', phone: '+1 111 222 333', status: true },
];

const UserList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(INITIAL_USERS);

  // FIXED: Using index-based toggle to match your working Category logic
  const toggleStatus = useCallback((index) => {
    setData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: !updated[index].status };
      return updated;
    });
  }, []);

  const columns = useMemo(() => [
    { 
      accessorKey: 'id', 
      header: '#',
      cell: ({ getValue }) => <span className="text-muted fw-medium">#{getValue()}</span> 
    },
    { 
      accessorKey: 'name', 
      header: 'Full Name',
      cell: ({ row }) => <span className="fw-bold" style={{ color: 'var(--text-main)' }}>{row.original.name}</span>
    },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'phone', header: 'Phone' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        /* FIXED: Using your working status-switch structure */
        <div className="status-switch">
          <input
            type="checkbox"
            id={`switch-user-${row.original.id}`}
            checked={row.original.status}
            onChange={() => toggleStatus(row.index)}
          />
          <label htmlFor={`switch-user-${row.original.id}`}></label>
        </div>
      )
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="d-flex gap-2">
          <button 
            className="btn btn-sm border bg-white shadow-sm" 
            onClick={() => navigate(`/dashboard/edit-user/${row.original.id}`)}
          >
            <IoCreateOutline size={18} style={{ color: 'var(--accent-blue)' }} />
          </button>
          <button 
            className="btn btn-sm border bg-white shadow-sm" 
            onClick={() => {
              if (window.confirm(`Delete ${row.original.name}?`)) {
                setData(prev => prev.filter(u => u.id !== row.original.id));
              }
            }}
          >
            <IoTrashOutline size={18} className="text-danger" />
          </button>
        </div>
      )
    }
  ], [navigate, toggleStatus]);

  return (
    <div className="main-content-container">
      <header className="page-header-box list-header-res">
        <div className="header-title-wrapper">
          <div className="icon-shape"><FaUsers size={18} /></div>
          <h4>User Management</h4>
        </div>
        <div className="header-action-group">
          <button className="btn-back-outline" onClick={() => navigate(-1)}>
            <FaArrowLeft size={14} /> Back
          </button>
          <Link to="/dashboard/add-user" className="btn-primary-custom no-underline">
            <FaPlus size={14} /> Add New User
          </Link>
        </div>
      </header>

      <div className="content-card p-0 overflow-hidden shadow-sm">
        <div className="table-responsive-wrapper">
          {/* Passed setData to ensure state synchronization */}
          <DataTable data={data} columns={columns} setData={setData} tableName="users" />
        </div>
      </div>
    </div>
  );
};

export default UserList;