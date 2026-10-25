





import React, { useState, useEffect, useRef } from 'react';
import {
  FaChevronDown, FaBars, FaBell, FaGraduationCap, FaXmark,
  FaMagnifyingGlass, FaEnvelope, FaUser, FaGear, FaRightFromBracket
} from "react-icons/fa6";
import { MENU_CONFIG } from './utils/menuConfig';
import './App.css';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="d-flex vh-100 overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`sidebar ${isSidebarOpen ? 'mobile-open' : 'collapsed'}`}>
        <div className="sidebar-header justify-content-between">
          <div className="d-flex align-items-center">
            <div className="bg-primary p-2 rounded-3 text-white me-3 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
              <FaGraduationCap size={20} />
            </div>
            {isSidebarOpen && <span className="fw-bold text-white fs-5">School Admin</span>}
          </div>
          <FaXmark className="text-white d-lg-none cursor-pointer" onClick={toggleSidebar} />
        </div>

        <div className="sidebar-nav">
          {MENU_CONFIG.map((item) => (
            <div key={item.id}>
              {item.type === 'dropdown' ? (
                <NavDropdown
                  item={item}
                  isOpen={openDropdown === item.id}
                  isCollapsed={!isSidebarOpen}
                  onToggle={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                  activeMenu={activeMenu}
                  onSelect={(lbl) => {
                    setActiveMenu(lbl);
                    if (window.innerWidth < 992) setIsSidebarOpen(false);
                  }}
                />
              ) : (
                <button
                  onClick={() => {
                    setActiveMenu(item.label);
                    if (window.innerWidth < 992) setIsSidebarOpen(false);
                  }}
                  className={`nav-btn-custom ${activeMenu === item.label ? 'active' : ''}`}
                >
                  <item.icon size={18} />
                  {isSidebarOpen && <span className="small fw-bold">{item.label}</span>}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar Footer Profile */}
        <div className="p-3 mt-auto border-top border-white border-opacity-10">
          <div className="d-flex align-items-center gap-3 cursor-pointer">
            <img src="https://i.pravatar.cc/100?u=1" width="40" height="40" className="rounded-circle border border-white border-opacity-10" alt="admin" />
            {isSidebarOpen && (
              <div className="text-white overflow-hidden">
                <p className="mb-0 small fw-bold text-truncate">John Doe</p>
                <p className="mb-0 smaller opacity-50">Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-grow-1 d-flex flex-column min-w-0">
        <header className="main-header">
          <div className="container-fluid d-flex align-items-center justify-content-between p-0">
            <div className="d-flex align-items-center gap-3">
              <button className="btn border-0 p-1 text-secondary" onClick={toggleSidebar}>
                <FaBars size={22} />
              </button>
              
            </div>

            <div className="d-flex align-items-center gap-4">
              <div className="d-flex gap-3 text-muted border-end pe-4">
                <div className="position-relative cursor-pointer">
                    <FaBell size={18} />
                    <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-white rounded-circle"></span>
                </div>
                <FaEnvelope size={18} className="cursor-pointer" />
              </div>

              <div className="position-relative" ref={profileRef} style={{cursor:"pointer"}}>
                <div className="d-flex align-items-center gap-2 cursor-pointer" onClick={() => setProfileOpen(!profileOpen)}>
                  <span className="small fw-bold d-none d-sm-inline">Anto D.</span>
                  <img src="https://i.pravatar.cc/100?u=anto" width="36" height="36" className="rounded-circle border shadow-sm" alt="user" />
                  <FaChevronDown size={10} className={`text-muted transition-all ${profileOpen ? 'rotate-180' : ''}`} />
                </div>

                {profileOpen && (
                  <div className="position-absolute end-0 mt-2 bg-white rounded-4 shadow-lg border py-2 z-3" style={{ width: '200px' }}>
                    <button className="btn btn-link text-decoration-none text-dark w-100 text-start px-3 py-2 small d-flex align-items-center gap-2 hover-bg-light">
                      <FaUser size={14} /> Profile
                    </button>
                    <button className="btn btn-link text-decoration-none text-dark w-100 text-start px-3 py-2 small d-flex align-items-center gap-2 hover-bg-light">
                      <FaGear size={14} /> Settings
                    </button>
                    <div className="border-top my-1" />
                    <button className="btn btn-link text-decoration-none text-danger fw-bold w-100 text-start px-3 py-2 small d-flex align-items-center gap-2">
                      <FaRightFromBracket size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>

              
            </div>
          </div>
        </header>

        <main className="flex-grow-1 overflow-auto p-4 p-md-5 bg-light">
          {/* Dashboard cards would go here */}
          <h2 className="fw-bold mb-4">Welcome Back, Admin!</h2>
        </main>
      </div>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && window.innerWidth < 992 && (
        <div className="position-fixed inset-0 bg-dark bg-opacity-50 d-lg-none" style={{ zIndex: 1045 }} onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

const NavDropdown = ({ item, isOpen, isCollapsed, onToggle, activeMenu, onSelect }) => {
  const isAnyChildActive = item.children?.some(c => c.label === activeMenu);
  return (
    <div className="mb-1">
      <button onClick={onToggle} className={`nav-btn-custom justify-content-between ${isOpen || isAnyChildActive ? 'text-white' : ''}`}>
        <div className="d-flex align-items-center gap-3">
          <item.icon size={18} />
          {!isCollapsed && <span className="small fw-bold">{item.label}</span>}
        </div>
        {!isCollapsed && <FaChevronDown size={10} className={`transition-all ${isOpen ? 'rotate-180' : ''}`} />}
      </button>
      {isOpen && !isCollapsed && (
        <ul className="menu-sub-container">
          {item.children.map((child, i) => (
            <li key={i} className="menu-sub-item">
              <div 
                onClick={() => onSelect(child.label)} 
                className={`menu-sub-link ${activeMenu === child.label ? 'active fw-bold' : ''}`}
              >
                {child.label}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;