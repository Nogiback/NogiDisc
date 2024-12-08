import { LoginForm } from '@/components/forms/LoginForm';
import { GoogleLoginButton } from '@/components/google/GoogleLoginButton';

export default function Homepage() {
  return (
    <div className='h-screen w-screen'>
      <div className='flex min-h-screen flex-col items-center justify-center gap-4'>
        <h1 className='text-3xl font-bold'>NogiDisc</h1>
        <LoginForm />
        <GoogleLoginButton />
      </div>
    </div>
  );
}