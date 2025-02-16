import { LoginForm } from '@/components/forms/LoginForm';
import { SignupForm } from '@/components/forms/SignupForm';
import { useState, useContext } from 'react';
import { LoaderPinwheel } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { Spinner } from '@/components/ui/spinner';

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
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='flex w-1/4 flex-col gap-4'>
        <div className='flex items-center justify-center gap-2'>
          <LoaderPinwheel size='36' />
          <h1 className='py-4 text-center text-3xl font-bold'>NogiDisc</h1>
        </div>
        {formToggle ? (
          <>
            <LoginForm />
            <div className='flex items-center justify-center gap-2'>
              <p>Not a member?</p>
              <a
                onClick={() => setFormToggle(false)}
                className='cursor-pointer'
              >
                Sign up here.
              </a>
            </div>
          </>
        ) : (
          <>
            <SignupForm />
            <div className='flex items-center justify-center gap-2'>
              <p>Already a member?</p>
              <a onClick={() => setFormToggle(true)} className='cursor-pointer'>
                Login here.
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
