import { LoginForm } from '@/components/forms/LoginForm';
import { SignupForm } from '@/components/forms/SignupForm';
import { useState } from 'react';
import { LoaderPinwheel } from 'lucide-react';

export default function Homepage() {
  const [formToggle, setFormToggle] = useState(true);

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
