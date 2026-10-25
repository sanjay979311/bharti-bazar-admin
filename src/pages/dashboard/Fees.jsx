


// import { useState } from 'react';
// import DataTable from '../../components/data-table/DataTable';
// import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';

// const Fees = () => {
//   const [feesData, setFeesData] = useState([
//     { id: 1, name: 'Rahul Sharma', amount: 5000, status: true },
//     { id: 2, name: 'Anjali Singh', amount: 4500, status: false },
//     { id: 3, name: 'Ravi Kumar', amount: 6000, status: true },
//   ]);

//   // Edit record
//   const handleEdit = (rowIndex) => {
//     alert(`Edit record: ${feesData[rowIndex].name}`);
//     // Here you can open modal or navigate to edit form
//   };

//   // Delete record
//   const handleDelete = (rowIndex) => {
//     if (window.confirm(`Delete record: ${feesData[rowIndex].name}?`)) {
//       const updated = feesData.filter((_, index) => index !== rowIndex);
//       setFeesData(updated);
//     }
//   };

//   const feesColumns = [
//     { accessorKey: 'name', header: 'Name' },
//     { accessorKey: 'amount', header: 'Amount', cell: ({ getValue }) => `₹${getValue()}` },
//     {
//       accessorKey: 'status',
//       header: 'Status',
//       cell: ({ row }) => (
//         <div className="status-switch">
//           <input
//             type="checkbox"
//             id={`switch-${row.id}`}
//             checked={row.original.status}
//             onChange={() => {
//               const updated = [...feesData];
//               updated[row.index].status = !updated[row.index].status;
//               setFeesData(updated);
//             }}
//           />
//           <label htmlFor={`switch-${row.id}`} data-on-label="Paid" data-off-label="Pending"></label>
//         </div>
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
//   ];

//   return (
//     <div>
//       <h4 className="mb-3">Fees Management</h4>
//       <DataTable data={feesData} columns={feesColumns} setData={setFeesData} />
//     </div>
//   );
// };

// export default Fees;

import { useState } from 'react';
import DataTable from '../../components/data-table/DataTable';
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';

const Fees = () => {
  const [feesData, setFeesData] = useState([
    { id: 1, name: 'Rahul Sharma', amount: 5000, status: true },
    { id: 2, name: 'Anjali Singh', amount: 4500, status: false },
    { id: 3, name: 'Ravi Kumar', amount: 6000, status: true },
  ]);

  // Edit record
  const handleEdit = (rowIndex) => {
    alert(`Edit record: ${feesData[rowIndex].name}`);
  };

  // Delete record
  const handleDelete = (rowIndex) => {
    if (window.confirm(`Delete record: ${feesData[rowIndex].name}?`)) {
      const updated = feesData.filter((_, index) => index !== rowIndex);
      setFeesData(updated);
    }
  };

  const feesColumns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'amount', header: 'Amount', cell: ({ getValue }) => `₹${getValue()}` },
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
              const updated = [...feesData];
              updated[row.index].status = !updated[row.index].status;
              setFeesData(updated);
            }}
          />
          <label htmlFor={`switch-${row.id}`} data-on-label="Paid" data-off-label="Pending"></label>
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
  ];

  return (
    <div>
      <h4 className="mb-3">Fees Management</h4>
      {/* Add tableName for dynamic CSV export */}
      <DataTable
        data={feesData}
        columns={feesColumns}
        setData={setFeesData}
        tableName="fees"  //  {/* CSV filename will be fees_export.csv */}
        
      />
    </div>
  );
};

export default Fees;