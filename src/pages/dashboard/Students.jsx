


import { useMemo, useState } from 'react';
import DataTable from '../../components/data-table/DataTable';
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';

const Students = () => {
const [data, setData] = useState([
  { id: 1, name: 'Rahul Sharma', class: '10', phone: '9876543210', status: true },
  { id: 2, name: 'Amit Kumar', class: '9', phone: '9876541111', status: false },
  { id: 3, name: 'Priya Singh', class: '8', phone: '9999999999', status: true },
  { id: 4, name: 'Rohit Das', class: '7', phone: '8888888888', status: false },
  { id: 5, name: 'Sneha Roy', class: '6', phone: '7777777777', status: true },

  { id: 6, name: 'Ankit Verma', class: '10', phone: '9123456780', status: true },
  { id: 7, name: 'Neha Gupta', class: '9', phone: '9234567890', status: false },
  { id: 8, name: 'Vikas Yadav', class: '8', phone: '9345678901', status: true },
  { id: 9, name: 'Pooja Mehta', class: '7', phone: '9456789012', status: false },
  { id: 10, name: 'Karan Patel', class: '6', phone: '9567890123', status: true },

  { id: 11, name: 'Riya Sen', class: '10', phone: '9678901234', status: false },
  { id: 12, name: 'Arjun Kapoor', class: '9', phone: '9789012345', status: true },
  { id: 13, name: 'Simran Kaur', class: '8', phone: '9890123456', status: false },
  { id: 14, name: 'Deepak Singh', class: '7', phone: '9901234567', status: true },
  { id: 15, name: 'Anjali Sharma', class: '6', phone: '9012345678', status: true },

  { id: 16, name: 'Manish Gupta', class: '10', phone: '9123456701', status: false },
  { id: 17, name: 'Kavita Joshi', class: '9', phone: '9234567012', status: true },
  { id: 18, name: 'Suresh Reddy', class: '8', phone: '9345670123', status: false },
  { id: 19, name: 'Meena Iyer', class: '7', phone: '9456701234', status: true },
  { id: 20, name: 'Raj Malhotra', class: '6', phone: '9567012345', status: false },

  { id: 21, name: 'Nikita Jain', class: '10', phone: '9670123456', status: true },
  { id: 22, name: 'Aakash Singh', class: '9', phone: '9781234567', status: false },
  { id: 23, name: 'Tina Dutta', class: '8', phone: '9892345678', status: true },
  { id: 24, name: 'Ravi Teja', class: '7', phone: '9903456789', status: false },
  { id: 25, name: 'Pallavi Shah', class: '6', phone: '9014567890', status: true },

  { id: 26, name: 'Sunil Choudhary', class: '10', phone: '9125678901', status: false },
  { id: 27, name: 'Divya Nair', class: '9', phone: '9236789012', status: true },
  { id: 28, name: 'Harsh Vardhan', class: '8', phone: '9347890123', status: false },
  { id: 29, name: 'Komal Agarwal', class: '7', phone: '9458901234', status: true },
  { id: 30, name: 'Yash Thakur', class: '6', phone: '9569012345', status: true },
]);

  const handleEdit = (rowIndex) => alert(`Edit student: ${data[rowIndex].name}`);
  const handleDelete = (rowIndex) => {
    if (window.confirm(`Delete student: ${data[rowIndex].name}?`)) {
      setData(prev => prev.filter((_, index) => index !== rowIndex));
    }
  };

  const columns = useMemo(() => [
    { accessorKey: 'id', header: '#' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'class', header: 'Class' },
    { accessorKey: 'phone', header: 'Phone' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="status-switch">
          <input
            type="checkbox"
            id={`switch-${row.id}`}
            checked={row.original.status}
            onChange={() => {
              const updated = [...data];
              updated[row.index].status = !updated[row.index].status;
              setData(updated);
            }}
          />
          <label htmlFor={`switch-${row.id}`}></label>
        </div>
      )
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="action-buttons">
          <button className="icon-btn edit" onClick={() => handleEdit(row.index)}>
            <IoCreateOutline />
          </button>
          <button className="icon-btn delete" onClick={() => handleDelete(row.index)}>
            <IoTrashOutline />
          </button>
        </div>
      )
    }
  ], [data]);

  return (
    <div>
      <h4 className="mb-3">Students Management</h4>
      <DataTable data={data} columns={columns} setData={setData} />
    </div>
  );
};

export default Students;