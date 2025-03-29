import { LoaderPinwheel } from 'lucide-react';
import { SignupForm } from '@/components/forms/SignupForm';
import signupPhoto from '@/assets/discgolfbasket.jpg';

export default function SignupPage({
  setFormToggle,
}: {
  setFormToggle: (value: boolean) => void;
}) {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='relative hidden bg-muted lg:block'>
        <img
          src={signupPhoto}
          alt='Image of disc golf basket'
          className='absolute inset-0 h-full w-full object-cover dark:grayscale'
        />
      </div>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <a
            href='#'
            className='flex items-center gap-2 font-medium text-inherit hover:text-inherit'
          >
            <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
              <LoaderPinwheel className='size-4' />
            </div>
            NogiDisc
          </a>
        </div>
        <div className='flex flex-1 flex-col items-center justify-center gap-6'>
          <h1 className='text-center text-3xl font-bold'>Sign Up</h1>
          <div className='w-full max-w-xs'>
            <SignupForm />
          </div>
          <div className='flex items-center justify-center gap-2 text-sm'>
            <p>Already a member?</p>
            <a onClick={() => setFormToggle(true)} className='cursor-pointer'>
              Log in here.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
