import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { ProtectedRouteProp } from '@/types/types';

const ProtectedRoute = ({ children }: ProtectedRouteProp) => {
  const { authUser, loading } = useContext(AuthContext);

  // TODO: FINISH LOADER IN FUTURE
  if (loading) return <div>Loading...</div>; // Show a loader while checking user

  if (!authUser) {
    return <Navigate to='/' replace />; // Redirect to homepage if not logged in
  }

  return children;
};

export default ProtectedRoute;
