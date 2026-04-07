import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InitialPageLoader from '../components/InitialPageLoader';
import NotFound from '../pages/NotFound';

interface ProtectedRouteProps {
  roles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({roles}) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <InitialPageLoader />;
  }

  if(user?.role && roles.includes(user.role)) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  }

  return <NotFound />


};

export default ProtectedRoute;
