import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

interface RootState {
  user: {
    state: {
      isAuthenticated: boolean;
      // Add other user state properties if necessary
    };
    // Add other user properties if necessary
  };
}

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  if (!user.state.isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    navigate('/login', { state: { from: location }, replace: true });
    return null;
  }

//   return <>{children}</>;
};

export default ProtectedRoute;
