


// import { Outlet, Link, useLocation } from "react-router";

// const DashboardLayout = () => {
//   const location = useLocation();

//   const menu = [
//     { name: "Dashboard", path: "/dashboard", icon: "📊" },
//     { name: "Students", path: "/dashboard/students", icon: "👨‍🎓" },
//     { name: "Attendance", path: "/dashboard/attendance", icon: "📅" },
//     { name: "Fees", path: "/dashboard/fees", icon: "💳" },
//     { name: "Courses", path: "/dashboard/courses", icon: "📚" },
//     { name: "Settings", path: "/dashboard/settings", icon: "⚙️" },
//   ];

//   return (
//     <div className="d-flex">

//       {/* SIDEBAR */}
//       <div
//         className="bg-white border-end p-3 col-sm-3"
//         style={{ width: "250px", minHeight: "calc(100vh - 70px)" }}
//       >
//         <h5 className="fw-bold text-primary mb-4">EduManage</h5>

//         <ul className="nav flex-column">
//           {menu.map((item, index) => (
//             <li key={index} className="nav-item mb-2">
//               <Link
//                 to={item.path}
//                 className={`nav-link d-flex align-items-center ${location.pathname.startsWith(item.path)
//                     ? "bg-primary text-white rounded"
//                     : "text-dark"
//                   }`}
//               >
//                 <span className="me-2">{item.icon}</span>
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>



//       <div className="flex-grow-1 bg-light py-3 py-md-4 px-2 px-md-4">

//         <div className="container-fluid">

//           {/* 🔥 PROFESSIONAL BOX */}
//           <div className="bg-white rounded-4 shadow-sm p-3 p-md-4">

//             <Outlet />

//           </div>

//         </div>

//       </div>


//     </div>
//   );
// };

// export default DashboardLayout;






// import { Outlet, Link, useLocation } from "react-router";
// import { useState } from "react";
// import {
//   MdDashboard,
//   MdSchool,
//   MdEvent,
//   MdPayment,
//   MdMenuBook,
//   MdSettings,
//   MdMenu
// } from "react-icons/md";

// const DashboardLayout = () => {
//   const location = useLocation();
//   const [showOffcanvas, setShowOffcanvas] = useState(false);
//   const [isShowMenu, setIsShowMenu] = useState(true);

//   const menu = [
//     { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
//     { name: "Students", path: "/dashboard/students", icon: <MdSchool /> },
//     { name: "Attendance", path: "/dashboard/attendance", icon: <MdEvent /> },
//     { name: "Fees", path: "/dashboard/fees", icon: <MdPayment /> },
//     { name: "Courses", path: "/dashboard/courses", icon: <MdMenuBook /> },
//     { name: "Settings", path: "/dashboard/settings", icon: <MdSettings /> },
//   ];

//   const handleClickMenu = () => {
//     setShowOffcanvas(!showOffcanvas)
//     setIsShowMenu(!isShowMenu)
//     console.log("clicked =========>")
//   }

//   return (
//     <div className="d-flex">

//       {/* MOBILE TOGGLE */}
//       {isShowMenu && <button
//         className="btn btn-primary d-md-none position-fixed m-3 shadow-lg"
//         style={{ zIndex: 1050, borderRadius: "50%" }}
//         onClick={handleClickMenu}
//       >
//         <MdMenu size={24} />
//       </button>}


//       {/* DESKTOP SIDEBAR */}
//       <div
//         className="bg-white border-end p-3 d-none d-md-flex flex-column"
//         style={{
//           width: "250px",
//           minHeight: "100vh",
//           boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h4 className="fw-bold text-primary mb-5 text-center">EduManage</h4>
//         <ul className="nav flex-column gap-2">
//           {menu.map((item, index) => {
//             const active = location.pathname.startsWith(item.path);
//             return (
//               <li key={index} className="nav-item">
//                 <Link
//                   to={item.path}
//                   className={`nav-link d-flex align-items-center ${active
//                     ? "bg-primary text-white shadow-sm"
//                     : "text-dark hover-bg-secondary"
//                     } p-2 rounded`}
//                 >
//                   <span className="me-2">{item.icon}</span>
//                   <span>{item.name}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       {/* MOBILE SIDEBAR USING BOOTSTRAP OFFCANVAS */}
//       <div className={`offcanvas offcanvas-start ${showOffcanvas ? "show" : ""}`}
//         tabIndex="-1"
//         style={{ visibility: showOffcanvas ? "visible" : "hidden", width: "250px" }}>
//         <div className="offcanvas-header">
//           <h5 className="fw-bold text-primary">EduManage</h5>
//           <button type="button" className="btn-close text-reset" onClick={handleClickMenu}></button>
//         </div>
//         <div className="offcanvas-body p-0">
//           <ul className="nav flex-column gap-2 p-3">
//             {menu.map((item, index) => {
//               const active = location.pathname.startsWith(item.path);
//               return (
//                 <li key={index} className="nav-item">
//                   <Link
//                     to={item.path}
//                     className={`nav-link d-flex align-items-center ${active
//                       ? "bg-primary text-white shadow-sm"
//                       : "text-dark hover-bg-secondary"
//                       } p-2 rounded`}
//                     onClick={handleClickMenu}
//                   >
//                     <span className="me-2">{item.icon}</span>
//                     <span>{item.name}</span>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="flex-grow-1 bg-light py-4 px-3 px-md-4">
//         <div className="container-fluid">
//           <div className="bg-white rounded-4 shadow-sm p-3 p-md-4">
//             <Outlet />
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default DashboardLayout;




import { Outlet, Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import {
  MdDashboard,
  MdSchool,
  MdEvent,
  MdPayment,
  MdMenuBook,
  MdSettings,
  MdMenu
} from "react-icons/md";

const DashboardLayout = () => {
  const location = useLocation();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(true);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
    { name: "Students", path: "/dashboard/students", icon: <MdSchool /> },
    { name: "Attendance", path: "/dashboard/attendance", icon: <MdEvent /> },
    { name: "Fees", path: "/dashboard/fees", icon: <MdPayment /> },
    { name: "Courses", path: "/dashboard/courses", icon: <MdMenuBook /> },
    { name: "Settings", path: "/dashboard/settings", icon: <MdSettings /> },
  ];

  const handleClickMenu = () => {
    setShowOffcanvas(!showOffcanvas);
    setIsShowMenu(!isShowMenu);
  };

  // 🔥 FIX: body scroll lock
  useEffect(() => {
    document.body.style.overflow = showOffcanvas ? "hidden" : "auto";
  }, [showOffcanvas]);

  return (
    <div className="d-flex">

      {/* MOBILE TOGGLE */}
      {isShowMenu && (
        <button
          className="btn btn-primary d-md-none position-fixed m-3 shadow-lg"
          style={{ zIndex: 1060, borderRadius: "50%" }}
          onClick={handleClickMenu}
        >
          <MdMenu size={24} />
        </button>
      )}

      {/* DESKTOP SIDEBAR */}
      <div
        className="bg-white border-end p-3 d-none d-md-flex flex-column"
        style={{
          width: "250px",
          minHeight: "100vh",
          boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
        }}
      >
        <h4 className="fw-bold text-primary mb-5 text-center">EduManage</h4>
        <ul className="nav flex-column gap-2">
          {menu.map((item, index) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <li key={index} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link d-flex align-items-center ${
                    active ? "bg-primary text-white shadow-sm" : "text-dark"
                  } p-2 rounded`}
                >
                  <span className="me-2">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 🔥 OVERLAY FIX */}
      {showOffcanvas && (
        <div
          onClick={handleClickMenu}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            zIndex: 1040,
          }}
        />
      )}

      {/* 🔥 MOBILE SIDEBAR FIX (NO visibility BUG) */}
      <div
        className="offcanvas offcanvas-start"
        style={{
          width: "250px",
          transform: showOffcanvas ? "translateX(0)" : "translateX(-100%)",
          transition: "0.3s ease",
          visibility: "visible",
          zIndex: 1050,
        }}
      >
        <div className="offcanvas-header">
          <h5 className="fw-bold text-primary">EduManage</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleClickMenu}
          ></button>
        </div>

        <div className="offcanvas-body p-0">
          <ul className="nav flex-column gap-2 p-3">
            {menu.map((item, index) => {
              const active = location.pathname.startsWith(item.path);
              return (
                <li key={index} className="nav-item">
                  <Link
                    to={item.path}
                    className={`nav-link d-flex align-items-center ${
                      active ? "bg-primary text-white shadow-sm" : "text-dark"
                    } p-2 rounded`}
                    onClick={handleClickMenu}
                  >
                    <span className="me-2">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* MAIN CONTENT */}
      {/* <div className="flex-grow-1 bg-light py-4 px-3 px-md-4">
        <div className="container-fluid">
          <div className="bg-white rounded-4 shadow-sm p-3 p-md-4">
            <Outlet />
          </div>
        </div>
      </div> */}
              <div className="container-fluid">

          {/* 🔥 PROFESSIONAL BOX */}
          <div className="">

            <Outlet />

          </div>

        </div>

      

    </div>
  );
};

export default DashboardLayout;