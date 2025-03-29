import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { Spinner } from '@/components/ui/spinner';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';

export default function Homepage() {
  const [formToggle, setFormToggle] = useState(true);
  const { authUser, isLoading } = useContext(AuthContext);

  if (authUser) return <Navigate to='/dashboard' />;

  if (isLoading)
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <Spinner />
      </div>
    );

  return (
    <div className='h-screen w-screen'>
      {formToggle ? (
        <LoginPage setFormToggle={setFormToggle} />
      ) : (
        <SignupPage setFormToggle={setFormToggle} />
      )}
    </div>
  );
}
