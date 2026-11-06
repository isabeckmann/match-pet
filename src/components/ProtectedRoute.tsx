import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <p role="status" className="p-4">
        Carregando...
      </p>
    );
  if (!user)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
