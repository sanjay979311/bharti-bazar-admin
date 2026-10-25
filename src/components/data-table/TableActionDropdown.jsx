// import React, { useState, useRef, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import { IoEllipsisVertical } from 'react-icons/io5';
// import { Link } from 'react-router';
// import './TableActionDropdown.css';

// const TableActionDropdown = ({ editUrl, onDelete, onView }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [coords, setCoords] = useState({ top: 0, left: 0 });
//   const dropdownRef = useRef(null);
//   const buttonRef = useRef(null);

//   // Update position of the menu relative to the button
//   const updatePosition = () => {
//     if (buttonRef.current) {
//       const rect = buttonRef.current.getBoundingClientRect();
//       // Calculates position + scroll offset to keep it pinned correctly
//       setCoords({
//         top: rect.bottom + window.scrollY,
//         left: rect.left + window.scrollX - 140, // Adjust -140 based on menu width
//       });
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       // Close only if click is outside BOTH the button and the teleported menu
//       if (
//         buttonRef.current && !buttonRef.current.contains(e.target) &&
//         dropdownRef.current && !dropdownRef.current.contains(e.target)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       updatePosition();
//       document.addEventListener("mousedown", handleClickOutside);
//       window.addEventListener("scroll", updatePosition, true); // Update on table scroll
//       window.addEventListener("resize", updatePosition);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       window.removeEventListener("scroll", updatePosition, true);
//       window.removeEventListener("resize", updatePosition);
//     };
//   }, [isOpen]);

//   const toggleDropdown = () => {
//     updatePosition();
//     setIsOpen(!isOpen);
//   };

//   const menuContent = (
//     <div 
//       className="custom-dropdown-menu portal-menu" 
//       ref={dropdownRef}
//       style={{ 
//         position: 'absolute', 
//         top: `${coords.top}px`, 
//         left: `${coords.left}px`,
//         zIndex: 9999 
//       }}
//     >
//       <div className="dropdown-inner">
//         {/* View Option */}
//         <button className="dropdown-link" onClick={() => { onView(); setIsOpen(false); }}>
//           <span className="icon-box info-icon">
//              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 12 8.182">
//                 <path d="M46-793.455a2.367,2.367,0,0,0,1.739-.716,2.367,2.367,0,0,0,.716-1.739,2.367,2.367,0,0,0-.716-1.739A2.367,2.367,0,0,0,46-798.364a2.367,2.367,0,0,0-1.739.716,2.367,2.367,0,0,0-.716,1.739,2.367,2.367,0,0,0,.716,1.739A2.367,2.367,0,0,0,46-793.455Zm0-.982a1.42,1.42,0,0,1-1.043-.43,1.42,1.42,0,0,1-.43-1.043,1.42,1.42,0,0,1,.43-1.043,1.42,1.42,0,0,1,1.043-.43,1.42,1.42,0,0,1,1.043.43,1.42,1.42,0,0,1,.43,1.043,1.42,1.42,0,0,1-.43,1.043A1.42,1.42,0,0,1,46-794.436Zm0,2.618a6.315,6.315,0,0,1-3.627-1.111A6.318,6.318,0,0,1,40-795.909a6.318,6.318,0,0,1,2.373-2.98A6.315,6.315,0,0,1,46-800a6.315,6.315,0,0,1,3.627,1.111A6.318,6.318,0,0,1,52-795.909a6.318,6.318,0,0,1-2.373,2.98A6.315,6.315,0,0,1,46-791.818ZM46-795.909Zm0,3a5.206,5.206,0,0,0,2.83-.811,5.331,5.331,0,0,0,1.97-2.189,5.331,5.331,0,0,0-1.97-2.189,5.206,5.206,0,0,0-2.83-.811,5.206,5.206,0,0,0-2.83.811,5.331,5.331,0,0,0-1.97,2.189,5.331,5.331,0,0,0,1.97,2.189A5.206,5.206,0,0,0,46-792.909Z" transform="translate(-40 800)" fill="currentColor"></path>
//              </svg>
//           </span>
//           <span className="label-text">View Info</span>
//         </button>

//         {/* Edit Option */}
//         <Link to={editUrl} className="dropdown-link" onClick={() => setIsOpen(false)}>
//           <span className="icon-box edit-icon">
//              <svg xmlns="http://www.w3.org/2000/svg" width="11.985" height="12" viewBox="0 0 11.985 12">
//                 <path d="M121.2-909a1.154,1.154,0,0,1-.846-.352A1.154,1.154,0,0,1,120-910.2v-8.39a1.154,1.154,0,0,1,.352-.846,1.154,1.154,0,0,1,.846-.352h3.91a.541.541,0,0,1,.449.187.645.645,0,0,1,.412.15.626.626,0,0,1-.157.412.563.563,0,0,1-.457.187h-3.9v8.39h8.39v-3.91a.541.541,0,0,1,.187-.449.645.645,0,0,1,.412-.15.645.645,0,0,1,.412.15.541.541,0,0,1,.187.449v3.91a1.154,1.154,0,0,1-.352.846,1.154,1.154,0,0,1-.846.352ZM125.393-914.393Zm-1.8,1.2v-1.453a1.183,1.183,0,0,1,.09-.457,1.165,1.165,0,0,1,.255-.382l5.154-5.154a1.2,1.2,0,0,1,.4-.27,1.2,1.2,0,0,1,.449-.09,1.183,1.183,0,0,1,.457.09,1.219,1.219,0,0,1,.4.27l.839.854a1.347,1.347,0,0,1,.255.4,1.147,1.147,0,0,1,.09.442,1.237,1.237,0,0,1-.082.442,1.122,1.122,0,0,1-.262.4l-5.154,5.154a1.27,1.27,0,0,1-.382.262,1.1,1.1,0,0,1-.457.1h-1.453a.58.58,0,0,1-.427-.172A.58.58,0,0,1,123.6-913.195Zm7.206-5.753-.839-.839Zm-6.007,5.154h.839l3.476-3.476-.419-.419-.434-.419-3.461,3.461Zm3.9-3.9-.434-.419.434.419.419.419Z" transform="translate(-120 921)" fill="currentColor"></path>
//              </svg>
//           </span>
//           <span className="label-text">Edit Record</span>
//         </Link>

//         <div className="dropdown-divider"></div>

//         {/* Delete Option */}
//         <button className="dropdown-link delete-btn" onClick={() => { onDelete(); setIsOpen(false); }}>
//           <span className="icon-box delete-icon">
//              <svg xmlns="http://www.w3.org/2000/svg" width="10.667" height="12" viewBox="0 0 10.667 12">
//                 <path d="M162-828a1.284,1.284,0,0,1-.942-.392,1.284,1.284,0,0,1-.392-.942V-838H160v-1.333h3.333V-840h4v.667h3.333V-838H170v8.667a1.284,1.284,0,0,1-.392.942,1.284,1.284,0,0,1-.942.392Zm6.667-10H162v8.667h6.667Zm-5.333,7.333h1.333v-6h-1.333Zm2.667,0h1.333v-6H166ZM162-838v0Z" transform="translate(-160 840)" fill="currentColor"></path>
//              </svg>
//           </span>
//           <span className="label-text">Delete Item</span>
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="action-dropdown-container">
//       <button 
//         ref={buttonRef}
//         className={`action-dot-btn ${isOpen ? 'active' : ''}`} 
//         onClick={toggleDropdown}
//       >
//         <IoEllipsisVertical size={18} />
//       </button>

//       {/* This "teleports" the menu to the body tag */}
//       {isOpen && createPortal(menuContent, document.body)}
//     </div>
//   );
// };

// export default TableActionDropdown;


import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoEllipsisVertical } from 'react-icons/io5';
import { Link } from 'react-router';
import './TableActionDropdown.css';

const TableActionDropdown = ({ editUrl, onDelete, onView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 140,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        buttonRef.current && !buttonRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      updatePosition();
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    updatePosition();
    setIsOpen(!isOpen);
  };

  const menuContent = (
    <div 
      className="custom-dropdown-menu portal-menu" 
      ref={dropdownRef}
      style={{ 
        position: 'absolute', 
        top: `${coords.top}px`, 
        left: `${coords.left}px`,
        zIndex: 9999 
      }}
    >
      <div className="dropdown-inner">
        {/* Render View Option ONLY IF onView prop is provided */}
        {onView && (
          <button className="dropdown-link" onClick={() => { onView(); setIsOpen(false); }}>
            <span className="icon-box info-icon">
               <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 12 8.182">
                  <path d="M46-793.455a2.367,2.367,0,0,0,1.739-.716,2.367,2.367,0,0,0,.716-1.739,2.367,2.367,0,0,0-.716-1.739A2.367,2.367,0,0,0,46-798.364a2.367,2.367,0,0,0-1.739.716,2.367,2.367,0,0,0-.716,1.739,2.367,2.367,0,0,0,.716,1.739A2.367,2.367,0,0,0,46-793.455Zm0-.982a1.42,1.42,0,0,1-1.043-.43,1.42,1.42,0,0,1-.43-1.043,1.42,1.42,0,0,1,.43-1.043,1.42,1.42,0,0,1,1.043-.43,1.42,1.42,0,0,1,1.043.43,1.42,1.42,0,0,1,.43,1.043,1.42,1.42,0,0,1-.43,1.043A1.42,1.42,0,0,1,46-794.436Zm0,2.618a6.315,6.315,0,0,1-3.627-1.111A6.318,6.318,0,0,1,40-795.909a6.318,6.318,0,0,1,2.373-2.98A6.315,6.315,0,0,1,46-800a6.315,6.315,0,0,1,3.627,1.111A6.318,6.318,0,0,1,52-795.909a6.318,6.318,0,0,1-2.373,2.98A6.315,6.315,0,0,1,46-791.818ZM46-795.909Zm0,3a5.206,5.206,0,0,0,2.83-.811,5.331,5.331,0,0,0,1.97-2.189,5.331,5.331,0,0,0-1.97-2.189,5.206,5.206,0,0,0-2.83-.811,5.206,5.206,0,0,0-2.83.811,5.331,5.331,0,0,0-1.97,2.189,5.331,5.331,0,0,0,1.97,2.189A5.206,5.206,0,0,0,46-792.909Z" transform="translate(-40 800)" fill="currentColor"></path>
               </svg>
            </span>
            <span className="label-text">View Info</span>
          </button>
        )}

        <Link to={editUrl} className="dropdown-link" onClick={() => setIsOpen(false)}>
          <span className="icon-box edit-icon">
             <svg xmlns="http://www.w3.org/2000/svg" width="11.985" height="12" viewBox="0 0 11.985 12">
                <path d="M121.2-909a1.154,1.154,0,0,1-.846-.352A1.154,1.154,0,0,1,120-910.2v-8.39a1.154,1.154,0,0,1,.352-.846,1.154,1.154,0,0,1,.846-.352h3.91a.541.541,0,0,1,.449.187.645.645,0,0,1,.412.15.626.626,0,0,1-.157.412.563.563,0,0,1-.457.187h-3.9v8.39h8.39v-3.91a.541.541,0,0,1,.187-.449.645.645,0,0,1,.412-.15.645.645,0,0,1,.412.15.541.541,0,0,1,.187.449v3.91a1.154,1.154,0,0,1-.352.846,1.154,1.154,0,0,1-.846.352ZM125.393-914.393Zm-1.8,1.2v-1.453a1.183,1.183,0,0,1,.09-.457,1.165,1.165,0,0,1,.255-.382l5.154-5.154a1.2,1.2,0,0,1,.4-.27,1.2,1.2,0,0,1,.449-.09,1.183,1.183,0,0,1,.457.09,1.219,1.219,0,0,1,.4.27l.839.854a1.347,1.347,0,0,1,.255.4,1.147,1.147,0,0,1,.09.442,1.237,1.237,0,0,1-.082.442,1.122,1.122,0,0,1-.262.4l-5.154,5.154a1.27,1.27,0,0,1-.382.262,1.1,1.1,0,0,1-.457.1h-1.453a.58.58,0,0,1-.427-.172A.58.58,0,0,1,123.6-913.195Zm7.206-5.753-.839-.839Zm-6.007,5.154h.839l3.476-3.476-.419-.419-.434-.419-3.461,3.461Zm3.9-3.9-.434-.419.434.419.419.419Z" transform="translate(-120 921)" fill="currentColor"></path>
             </svg>
          </span>
          <span className="label-text">Edit Record</span>
        </Link>

        <div className="dropdown-divider"></div>

        <button className="dropdown-link delete-btn" onClick={() => { onDelete(); setIsOpen(false); }}>
          <span className="icon-box delete-icon">
             <svg xmlns="http://www.w3.org/2000/svg" width="10.667" height="12" viewBox="0 0 10.667 12">
                <path d="M162-828a1.284,1.284,0,0,1-.942-.392,1.284,1.284,0,0,1-.392-.942V-838H160v-1.333h3.333V-840h4v.667h3.333V-838H170v8.667a1.284,1.284,0,0,1-.392.942,1.284,1.284,0,0,1-.942.392Zm6.667-10H162v8.667h6.667Zm-5.333,7.333h1.333v-6h-1.333Zm2.667,0h1.333v-6H166ZM162-838v0Z" transform="translate(-160 840)" fill="currentColor"></path>
             </svg>
          </span>
          <span className="label-text">Delete Item</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="action-dropdown-container">
      <button 
        ref={buttonRef}
        className={`action-dot-btn ${isOpen ? 'active' : ''}`} 
        onClick={toggleDropdown}
      >
        <IoEllipsisVertical size={18} />
      </button>

      {isOpen && createPortal(menuContent, document.body)}
    </div>
  );
};

export default TableActionDropdown;
