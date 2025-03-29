import { Navigate } from 'react-router-dom';
import { ProtectedRouteProp } from '@/types/types';
import { useAuth } from '@/hooks/auth/useAuth';
import { Spinner } from '@/components/ui/spinner';

export function ProtectedRoute({ children }: ProtectedRouteProp) {
  const { authUser, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <Spinner />
      </div>
    );

  if (!authUser && !isLoading) {
    return <Navigate to='/' replace />;
  }

  return children;
}
