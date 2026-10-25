import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router'; 
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import { FaChalkboardUser, FaPlus, FaArrowLeft } from 'react-icons/fa6'; 
import DataTable from '../../data-table/DataTable';

const INITIAL_TEACHERS = [
  { id: 1, name: 'Dr. Sarah Connor', email: 'sarah.c@edu.com', dept: 'Science', phone: '+1 234 567 890', status: true },
  { id: 2, name: 'Prof. James Wilson', email: 'james.w@edu.com', dept: 'Mathematics', phone: '+1 987 654 321', status: true },
  { id: 3, name: 'Maria Garcia', email: 'm.garcia@edu.com', dept: 'Languages', phone: '+1 555 012 345', status: false },
  { id: 4, name: 'Robert Brown', email: 'r.brown@edu.com', dept: 'History', phone: '+1 444 888 999', status: true },
  { id: 5, name: 'Linda Taylor', email: 'l.taylor@edu.com', dept: 'Arts', phone: '+44 20 7946 0958', status: true },
  { id: 6, name: 'Michael Scott', email: 'm.scott@edu.com', dept: 'Business', phone: '+1 333 222 111', status: true },
  { id: 7, name: 'Dwight Schrute', email: 'd.schrute@edu.com', dept: 'Science', phone: '+1 777 666 555', status: true },
  { id: 8, name: 'Pam Beesly', email: 'p.beesly@edu.com', dept: 'Arts', phone: '+1 888 777 666', status: false },
  { id: 9, name: 'Jim Halpert', email: 'j.halpert@edu.com', dept: 'Sports', phone: '+1 123 999 000', status: true },
  { id: 10, name: 'Angela Martin', email: 'a.martin@edu.com', dept: 'Mathematics', phone: '+1 111 222 333', status: true },
  { id: 11, name: 'Oscar Martinez', email: 'o.martinez@edu.com', dept: 'Business', phone: '+1 000 000 000', status: true },
  { id: 12, name: 'Kevin Malone', email: 'k.malone@edu.com', dept: 'Culinary', phone: '+1 555 444 333', status: true },
  { id: 13, name: 'Stanley Hudson', email: 's.hudson@edu.com', dept: 'History', phone: '+1 222 333 444', status: false },
  { id: 14, name: 'Kelly Kapoor', email: 'k.kapoor@edu.com', dept: 'Drama', phone: '+1 999 888 777', status: true },
  { id: 15, name: 'Ryan Howard', email: 'r.howard@edu.com', dept: 'Technology', phone: '+1 666 555 444', status: true },
];

const TeacherList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(INITIAL_TEACHERS);

  const columns = useMemo(() => [
    { 
      accessorKey: 'name', 
      header: 'Teacher Name',
      cell: ({ row }) => <span className="fw-bold" style={{ color: 'var(--text-main)' }}>{row.original.name}</span>
    },
    { accessorKey: 'dept', header: 'Department' },
    { accessorKey: 'email', header: 'Email' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" checked={row.original.status} readOnly />
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
  ], [navigate]);

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
          <DataTable data={data} columns={columns} tableName="teachers" />
        </div>
      </div>
    </div>
  );
};

export default TeacherList;