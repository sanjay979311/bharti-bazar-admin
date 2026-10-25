


import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router'; 
import Sidebar from '../sidebar';
import Header from "../header/Header";
import Content from '../content';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  const getActiveTitle = () => {
    const path = location.pathname.split("/").filter(Boolean).pop();
    if (!path || path === "dashboard") return "Dashboard Overview";
    return path.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const currentTitle = getActiveTitle();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 992) setIsSidebarOpen(false);
  }, [location.pathname]);

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
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        // activeMenu={currentTitle} 
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />

      <div className="flex-grow-1 d-flex flex-column min-w-0">
        <Header 
          toggleSidebar={toggleSidebar} 
          // title={currentTitle} // Passing title here for breadcrumbs
          profileOpen={profileOpen} 
          setProfileOpen={setProfileOpen} 
          profileRef={profileRef} 
        />
        
        <Content>
          <Outlet /> 
        </Content>
      </div>

      {isSidebarOpen && window.innerWidth < 992 && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none" 
          style={{ zIndex: 1045, backdropFilter: 'blur(2px)' }} 
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;

