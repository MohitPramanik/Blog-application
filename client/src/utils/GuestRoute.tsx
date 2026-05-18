import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../store/hooks';

export default function GuestRoute() {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? <Navigate to="/blogs" replace /> : <Outlet />
}
