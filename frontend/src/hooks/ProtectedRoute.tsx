import { Navigate } from 'react-router-dom';
import { ProtectedRouteProp } from '@/types/types';
import { useAuth } from '@/context/useAuth';

export function ProtectedRoute({ children }: ProtectedRouteProp) {
  const { authUser } = useAuth();

  if (!authUser) {
    return <Navigate to='/' replace />; // Redirect to homepage if not logged in
  }

  return children;
}
