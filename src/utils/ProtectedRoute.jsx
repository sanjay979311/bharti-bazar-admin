



// import { useLocation, Navigate, Outlet } from "react-router";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "../features/auth/authSlice";


// const ProtectedRoute = ({ allowedRoles }) => {
//     const user = useSelector(selectCurrentUser);
//     const location = useLocation();

//     // Case 1: User is not logged in at all
//     if (!user) {
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }

//     // Case 2: User is logged in, but their role is not in the allowed list
//     const isAuthorized = allowedRoles.includes(user?.role);

//     if (!isAuthorized) {
//         return <Navigate to="/unauthorized" state={{ from: location }} replace />;
//     }

//     // Case 3: User is authorized
//     return <Outlet />;
// };

// export default ProtectedRoute;



import { useLocation, Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";


const ProtectedRoute = ({ allowedRoles }) => {
    const user = useSelector(selectCurrentUser);
    const location = useLocation();

    // If we get here and there's no user, the check is finished and they are definitely not logged in.
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const isAuthorized = allowedRoles.includes(user?.role);

    if (!isAuthorized) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;