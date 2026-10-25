import { useMemo, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router';
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import { FaChalkboardUser, FaPlus, FaArrowLeft } from 'react-icons/fa6'; 
import DataTable from '../../data-table/DataTable';

const INITIAL_TEACHERS = [
  { id: 1, name: 'Dr. Sarah Connor', email: 'sarah.c@edu.com', dept: 'Science', status: true },
  { id: 2, name: 'Prof. James Wilson', email: 'james.w@edu.com', dept: 'Mathematics', status: true },
  { id: 3, name: 'Maria Garcia', email: 'm.garcia@edu.com', dept: 'Languages', status: false },
  { id: 4, name: 'Robert Brown', email: 'r.brown@edu.com', dept: 'History', status: true },
  { id: 5, name: 'Linda Taylor', email: 'l.taylor@edu.com', dept: 'Arts', status: true },
];

const TeacherList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(INITIAL_TEACHERS);

  // Toggle using Index (Matching your working logic)
  const toggleStatus = useCallback((index) => {
    setData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: !updated[index].status };
      return updated;
    });
  }, []);

  const columns = useMemo(() => [
    { accessorKey: 'id', header: '#' },
    { 
      accessorKey: 'name', 
      header: 'Teacher Name',
      cell: ({ row }) => <span className="fw-bold">{row.original.name}</span>
    },
    { accessorKey: 'dept', header: 'Department' },
    { accessorKey: 'email', header: 'Email' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="status-switch">
          <input
            type="checkbox"
            id={`switch-${row.original.id}`}
            checked={row.original.status}
            onChange={() => toggleStatus(row.index)} // Uses row.index
          />
          <label htmlFor={`switch-${row.original.id}`}></label>
        </div>
      )
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="d-flex gap-2">
          <button className="btn btn-sm border bg-white" onClick={() => navigate(`/dashboard/edit-teacher/${row.original.id}`)}>
            <IoCreateOutline size={18} style={{ color: 'var(--accent-blue)' }} />
          </button>
          <button className="btn btn-sm border bg-white" onClick={() => setData(prev => prev.filter(t => t.id !== row.original.id))}>
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
          <div className="icon-shape"><FaChalkboardUser size={18} /></div>
          <h4>Teacher Management</h4>
        </div>
        <div className="header-action-group">
          <button className="btn-back-outline" onClick={() => navigate(-1)}><FaArrowLeft size={14} /> Back</button>
          <Link to="/dashboard/add-teacher" className="btn-primary-custom no-underline">
            <FaPlus size={14} /> Add Teacher
          </Link>
        </div>
      </header>

      <div className="content-card p-0 overflow-hidden shadow-sm">
        <div className="table-responsive-wrapper">
          <DataTable 
            data={data} 
            columns={columns} 
            setData={setData} 
            tableName="teachers" 
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherList;