import { useAppSelector } from "../store/hooks"
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
