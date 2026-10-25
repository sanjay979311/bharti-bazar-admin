


import React from 'react';
import { NavLink } from 'react-router'; 
import { FaGraduationCap, FaXmark, FaChevronDown } from "react-icons/fa6";
import { MENU_CONFIG } from '../../utils/menuConfig';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, openDropdown, setOpenDropdown }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'mobile-open' : 'collapsed'}`}>
      <div className="sidebar-header justify-content-between px-3 py-4">
        <div className="d-flex align-items-center">
          <div className="bg-primary p-2 rounded-3 text-white me-3 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
            <FaGraduationCap size={20} />
          </div>
          {isOpen && <span className="fw-bold text-white fs-5">Super Admin</span>}
        </div>

        <button className="mobile-close-btn d-lg-none border-0 bg-transparent text-white" onClick={toggleSidebar}>
          <FaXmark size={20} />
        </button>
      </div>

     
      <div className="sidebar-nav px-2">
  {MENU_CONFIG.map((item) => (
    <div key={item.id} className="mb-1">
      {item.type === 'dropdown' ? (
        <NavDropdown
          item={item}
          isOpen={openDropdown === item.id}
          isCollapsed={!isOpen}
          onToggle={() =>
            setOpenDropdown(openDropdown === item.id ? null : item.id)
          }
        />
      ) : (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `nav-btn-custom ${isActive ? 'active' : ''}`
          }
        >
          <item.icon size={18} />
          {isOpen && <span>{item.label}</span>}
        </NavLink>
      )}
    </div>
  ))}
</div>
      
      <div className="p-3 mt-auto border-top border-white border-opacity-10">
          <div className="d-flex align-items-center gap-3">
            <img src="https://i.pravatar.cc/100?u=1" width="35" height="35" className="rounded-circle" alt="admin" />
            {isOpen && (
              <div className="text-white">
                <p className="mb-0 small fw-bold">John Doe</p>
                <p className="mb-0 smaller opacity-50">Admin</p>
              </div>
            )}
          </div>
      </div>
    </aside>
  );
};

const NavDropdown = ({ item, isOpen, isCollapsed, onToggle, toggleSidebar }) => {
  return (
    <div className="w-100">
      <button 
        onClick={onToggle} 
        className={`nav-btn-custom w-100 border-0 d-flex align-items-center justify-content-between ${isOpen ? 'open' : ''}`}
      >
        <div className="d-flex align-items-center gap-2">
          <item.icon size={18} />
          {!isCollapsed && <span className="small fw-bold">{item.label}</span>}
        </div>
        {!isCollapsed && <FaChevronDown size={10} className={`transition-all ${isOpen ? 'rotate-180' : ''}`} />}
      </button>

      {/* This structure is critical for the dashed lines to work */}
      {isOpen && !isCollapsed && (
        <ul className="menu-sub-container">
          {item.children.map((child, i) => (
            <li key={i} className="menu-sub-item">
              <NavLink 
                to={child.path} 
                onClick={() => window.innerWidth < 992 && toggleSidebar()}
                className={({ isActive }) => `menu-sub-link ${isActive ? 'active' : ''}`}
              >
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;