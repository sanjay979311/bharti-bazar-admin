


import React from 'react';
import { FaBars, FaBell, FaEnvelope, FaChevronDown, FaUser, FaGear, FaRightFromBracket } from "react-icons/fa6";
import { useLogoutMutation } from '../../features/auth/authApiSlice'; // Adjust path as needed
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import './Header.css';

const Header = ({ toggleSidebar, profileOpen, setProfileOpen, profileRef }) => {
  const user = useSelector(selectCurrentUser);
  const [logout, { isLoading }] = useLogoutMutation();


  const handleLogout = async () => {
  try {
    await logout().unwrap();
    
    // 1. Reset the entire API state (wipes data from RAM)
    dispatch(apiSlice.util.resetApiState());
    
    // 2. Redirect and REPLACE the history entry
    // This makes the current 'Dashboard' history point become 'Login'
    navigate('/login', { replace: true });

    // 3. Optional: Force a hard reload to clear any remaining JS memory
    window.location.reload(); 
  } catch (err) {
    console.error(err);
  }
};

  return (
    <header className="main-header">
      <div className="container-fluid d-flex align-items-center justify-content-between p-0">
        <button className="btn border-0 p-1 text-secondary" onClick={toggleSidebar}>
          <FaBars size={22} />
        </button>

        <div className="d-flex align-items-center gap-4">
          <div className="d-flex gap-3 text-muted border-end pe-4">
            <div className="position-relative cursor-pointer">
              <FaBell size={18} />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-white rounded-circle"></span>
            </div>
            <FaEnvelope size={18} className="cursor-pointer" />
          </div>

          <div className="position-relative" ref={profileRef}>
            <div 
              className="d-flex align-items-center gap-2 cursor-pointer" 
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <span className="small fw-bold d-none d-sm-inline">
                {user?.name || "User"}
              </span>
              <img 
                src={`https://ui-avatars.com/api/?name=${user?.name || 'U'}&background=random`} 
                width="36" height="36" 
                className="rounded-circle border shadow-sm" 
                alt="user" 
              />
              <FaChevronDown size={10} className={`text-muted transition-all ${profileOpen ? 'rotate-180' : ''}`} />
            </div>

            {profileOpen && (
              <div className="position-absolute end-0 mt-2 bg-white rounded-4 shadow-lg border py-2 z-3" style={{ width: '200px' }}>
                <button className="dropdown-item-custom"><FaUser size={14} /> Profile</button>
                <button className="dropdown-item-custom"><FaGear size={14} /> Settings</button>
                <div className="border-top my-1" />
                <button 
                  className="dropdown-item-custom text-danger fw-bold" 
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  <FaRightFromBracket size={14} /> {isLoading ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;