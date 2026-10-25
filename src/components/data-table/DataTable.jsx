



// import React, { useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   flexRender,
// } from "@tanstack/react-table";
// import {
//   IoSearchOutline,
//   IoDownloadOutline,
//   IoCloudUploadOutline,
//   IoChevronBack,
//   IoChevronForward,
//   IoCreateOutline,
//   IoTrashOutline,
// } from "react-icons/io5";
// import "./DataTable.css";

// const DataTable = ({ data, columns, setData, tableName = "table" }) => {
//   const [sorting, setSorting] = useState([]);
//   const [globalFilter, setGlobalFilter] = useState("");

//   const toggleStatus = (rowIndex) => {
//     setData((prev) =>
//       prev.map((item, index) =>
//         index === rowIndex ? { ...item, status: !item.status } : item
//       )
//     );
//   };

//   // ================= Export CSV =================
//   const exportToCSV = () => {
//     if (!data || data.length === 0) return;

//     // Filter out non-data columns (like actions)
//     const exportColumns = columns.filter((col) => col.accessorKey);

//     // Prepare CSV headers
//     const headers = exportColumns.map((col) => col.header);

//     // Prepare CSV rows
//     const rows = data.map((row) =>
//       exportColumns
//         .map((col) => {
//           let value = row[col.accessorKey];
//           if (typeof value === "boolean") value = value ? "Active" : "Inactive";
//           // Escape quotes
//           return `"${value ?? ""}"`;
//         })
//         .join(",")
//     );

//     const csvContent = [headers.join(","), ...rows].join("\n");

//     // Download CSV
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", `${tableName}_export.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const table = useReactTable({
//     data,
//     columns,
//     state: { sorting, globalFilter },
//     onSortingChange: setSorting,
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   return (
//     <div className="dataTables_wrapper table-container">
//       {/* ===== HEADER ===== */}
//       <div className="table-header">
//         <div className="header-left">
//           <button className="btn-icon" onClick={exportToCSV}>
//             <IoDownloadOutline />
//             <span>Export</span>
//           </button>

//           <label className="btn-icon success">
//             <IoCloudUploadOutline />
//             <span>Import</span>
//             <input type="file" hidden />
//           </label>
//         </div>

//         <div className="header-right">
//           <div className="dataTables_filter search-box">
//             <IoSearchOutline />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={globalFilter}
//               onChange={(e) => setGlobalFilter(e.target.value)}
//             />
//           </div>

//           <div className="dataTables_length">
//             <label>
//               Show{" "}
//               <select
//                 value={table.getState().pagination.pageSize}
//                 onChange={(e) => table.setPageSize(Number(e.target.value))}
//               >
//                 {[5, 10, 25, 50, 100].map((size) => (
//                   <option key={size} value={size}>
//                     {size}
//                   </option>
//                 ))}
//               </select>{" "}
//               entries
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* ===== TABLE ===== */}
//       <div className="table-wrapper">
//         <table className="custom-table">
//           <thead>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th key={header.id}>
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map((cell) => {
//                   const label = cell.column.columnDef.header;

//                   if (cell.column.id === "status") {
//                     return (
//                       <td key={cell.id} data-label={label}>
//                         <div className="status-switch">
//                           <input
//                             type="checkbox"
//                             id={`switch-${row.id}`}
//                             checked={row.original.status}
//                             onChange={() => toggleStatus(row.index)}
//                           />
//                           <label htmlFor={`switch-${row.id}`}></label>
//                         </div>
//                       </td>
//                     );
//                   }

//                   if (cell.column.id === "actions") {
//                     return (
//                       <td key={cell.id} data-label={label}>
//                         <div className="action-buttons">
//                           <button
//                             className="icon-btn edit"
//                             onClick={() => alert("Edit " + row.id)}
//                           >
//                             <IoCreateOutline />
//                           </button>
//                           <button
//                             className="icon-btn delete"
//                             onClick={() => alert("Delete " + row.id)}
//                           >
//                             <IoTrashOutline />
//                           </button>
//                         </div>
//                       </td>
//                     );
//                   }

//                   return (
//                     <td key={cell.id} data-label={label}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ===== PAGINATION ===== */}
//       <div className="pagination-box">
//         <div className="entries-info">
//           Showing{" "}
//           {table.getState().pagination.pageIndex *
//             table.getState().pagination.pageSize +
//             1}{" "}
//           to{" "}
//           {Math.min(
//             (table.getState().pagination.pageIndex + 1) *
//               table.getState().pagination.pageSize,
//             data.length
//           )}{" "}
//           of {data.length} entries
//         </div>

//         <div className="pagination-controls">
//           <button
//             className="page-btn"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             <IoChevronBack />
//           </button>

//           {Array.from({ length: table.getPageCount() }, (_, i) => (
//             <button
//               key={i}
//               className={`page-number ${
//                 table.getState().pagination.pageIndex === i ? "active" : ""
//               }`}
//               onClick={() => table.setPageIndex(i)}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             className="page-btn"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             <IoChevronForward />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DataTable;


import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  IoSearchOutline,
  IoDownloadOutline,
  IoCloudUploadOutline,
  IoChevronBack,
  IoChevronForward,
  IoArrowUpOutline,
  IoArrowDownOutline,
} from "react-icons/io5";
import "./DataTable.css";

const DataTable = ({ data, columns, tableName = "table" }) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // ================= Professional Export CSV =================
  const exportToCSV = () => {
    if (!data?.length) return;

    // Only export columns that have an accessorKey and aren't 'actions'
    const exportableColumns = columns.filter(col => col.accessorKey && col.id !== 'actions');
    const headers = exportableColumns.map(col => col.header).join(",");
    
    const rows = data.map(row => 
      exportableColumns.map(col => {
        const value = row[col.accessorKey] ?? "";
        return typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value;
      }).join(",")
    );

    const blob = new Blob([[headers, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${tableName}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dataTables_wrapper table-container">
      {/* ===== HEADER ===== */}
      <div className="table-header">
        <div className="header-left">
          <button className="btn-icon" onClick={exportToCSV}>
            <IoDownloadOutline />
            <span>Export</span>
          </button>

          <label className="btn-icon success" style={{ cursor: 'pointer' }}>
            <IoCloudUploadOutline />
            <span>Import</span>
            <input type="file" hidden onChange={(e) => console.log(e.target.files[0])} />
          </label>
        </div>

        <div className="header-right">
          <div className="dataTables_filter search-box">
            <IoSearchOutline />
            <input
              type="text"
              placeholder="Search..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>

          <div className="dataTables_length">
            <label>
              Show{" "}
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
              >
                {[5, 10, 25, 50].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>{" "}
              entries
            </label>
          </div>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th 
                    key={header.id} 
                    onClick={header.column.getToggleSortingHandler()}
                    className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                  >
                    <div className="d-flex align-items-center gap-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <IoArrowUpOutline />,
                        desc: <IoArrowDownOutline />,
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} data-label={cell.column.columnDef.header}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '2rem' }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== PAGINATION ===== */}
      <div className="pagination-box">
        <div className="entries-info">
          Showing {table.getRowModel().rows.length > 0 ? table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1 : 0} to{" "}
          {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)} of {data.length} entries
        </div>

        <div className="pagination-controls">
          <button
            className="page-btn"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <IoChevronBack />
          </button>

          {/* Simple Pagination Logic for Reusability */}
          {table.getPageCount() <= 5 
            ? Array.from({ length: table.getPageCount() }, (_, i) => (
                <button
                  key={i}
                  className={`page-number ${table.getState().pagination.pageIndex === i ? "active" : ""}`}
                  onClick={() => table.setPageIndex(i)}
                >
                  {i + 1}
                </button>
              ))
            : <span className="p-2">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
          }

          <button
            className="page-btn"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <IoChevronForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DataTable);