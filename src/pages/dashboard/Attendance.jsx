

// import { useMemo, useState } from 'react';
// import DataTable from '../../components/data-table/DataTable';
// import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';

// const Attendance = () => {
//   // 🔹 Attendance data
//   const [data, setData] = useState([
//     { id: 1, name: 'Rahul Sharma', status: 'Present' },
//     { id: 2, name: 'Amit Kumar', status: 'Absent' },
//     { id: 3, name: 'Priya Singh', status: 'Present' },
//     { id: 4, name: 'Rohit Das', status: 'Absent' },
//     { id: 5, name: 'Sneha Roy', status: 'Present' },
//   ]);

//   // 🔹 Handle Edit
//   const handleEdit = (rowIndex) => {
//     const student = data[rowIndex];
//     const newStatus = prompt(`Edit attendance for ${student.name}`, student.status);
//     if (newStatus) {
//       const updated = [...data];
//       updated[rowIndex].status = newStatus;
//       setData(updated);
//     }
//   };

//   // 🔹 Handle Delete
//   const handleDelete = (rowIndex) => {
//     if (window.confirm(`Delete attendance for ${data[rowIndex].name}?`)) {
//       setData(prev => prev.filter((_, index) => index !== rowIndex));
//     }
//   };

//   // 🔹 Columns definition
//   const columns = useMemo(() => [
//     { accessorKey: 'id', header: '#' },
//     { accessorKey: 'name', header: 'Name' },
//     {
//       accessorKey: 'status',
//       header: 'Status',
//       cell: ({ row }) => (
//         <select
//           className="form-select"
//           value={row.original.status}
//           onChange={(e) => {
//             const updated = [...data];
//             updated[row.index].status = e.target.value;
//             setData(updated);
//           }}
//         >
//           <option>Present</option>
//           <option>Absent</option>
//         </select>
//       )
//     },
//     {
//       id: 'actions',
//       header: 'Action',
//       cell: ({ row }) => (
//         <div className="action-buttons">
//           <button className="icon-btn edit" onClick={() => handleEdit(row.index)}>
//             <IoCreateOutline />
//           </button>
//           <button className="icon-btn delete" onClick={() => handleDelete(row.index)}>
//             <IoTrashOutline />
//           </button>
//         </div>
//       )
//     }
//   ], [data]);

//   return (
//     <div className="table-container">
//       <h4 className="mb-3">Attendance</h4>

//       {/* Date picker */}
//       <div className="mb-3">
//         <input type="date" className="form-control w-25" />
//       </div>

//       {/* DataTable */}
//       <DataTable data={data} columns={columns} setData={setData} />

//       <button className="btn btn-success mt-3">Save Attendance</button>
//     </div>
//   );
// };

// export default Attendance;



import { useMemo, useState } from 'react';
import DataTable from '../../components/data-table/DataTable';
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';

const Attendance = () => {
  // 🔹 Attendance data
  const [data, setData] = useState([
    { id: 1, name: 'Rahul Sharma', status: 'Present' },
    { id: 2, name: 'Amit Kumar', status: 'Absent' },
    { id: 3, name: 'Priya Singh', status: 'Present' },
    { id: 4, name: 'Rohit Das', status: 'Absent' },
    { id: 5, name: 'Sneha Roy', status: 'Present' },
  ]);

  // 🔹 Handle Edit
  const handleEdit = (rowIndex) => {
    const student = data[rowIndex];
    const newStatus = prompt(`Edit attendance for ${student.name}`, student.status);
    if (newStatus) {
      const updated = [...data];
      updated[rowIndex].status = newStatus;
      setData(updated);
    }
  };

  // 🔹 Handle Delete
  const handleDelete = (rowIndex) => {
    if (window.confirm(`Delete attendance for ${data[rowIndex].name}?`)) {
      setData(prev => prev.filter((_, index) => index !== rowIndex));
    }
  };

  // 🔹 Columns definition
  const columns = useMemo(() => [
    { accessorKey: 'id', header: '#' },
    { accessorKey: 'name', header: 'Name' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <select
          className="form-select"
          value={row.original.status}
          onChange={(e) => {
            const updated = [...data];
            updated[row.index].status = e.target.value;
            setData(updated);
          }}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>
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
    <div className="table-container">
      <h4 className="mb-3">Attendance</h4>

      {/* Date picker */}
      <div className="mb-3">
        <input type="date" className="form-control w-25" />
      </div>

      {/* DataTable with tableName for dynamic CSV export */}
      <DataTable 
        data={data} 
        columns={columns} 
        setData={setData} 
        tableName="attendance"   //  {/* ✅ CSV filename: attendance_export.csv */}
      />

      <button className="btn btn-success mt-3">Save Attendance</button>
    </div>
  );
};

export default Attendance;