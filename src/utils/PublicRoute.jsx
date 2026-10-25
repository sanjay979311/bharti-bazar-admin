import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { selectCurrentToken, selectIsInitialized } from "../features/auth/authSlice";

const PublicRoute = () => {
  const token = useSelector(selectCurrentToken);
  const isInitialized = useSelector(selectIsInitialized);

  if (!isInitialized) return null; // Wait for handshake

  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;