import { useAppSelector } from '../store/hooks';
import { Outlet } from 'react-router';

interface PrivateRouteProps {
    roles: string[];
}

export default function PrivateRoute({roles}: PrivateRouteProps) {
    const {isAuthenticated, user} = useAppSelector((state) => state.auth);

    return isAuthenticated && roles.includes(user.role) ? <Outlet /> : <div>Not Found</div>
}
