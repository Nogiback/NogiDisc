import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '../ui/button';
import GoogleIcon from '@/assets/googleIcon.png';
import useGoogleAuth from '@/hooks/google/useGoogleAuth';
import { useLoginContext } from '@/hooks/auth/useLoginContext';

export function GoogleSignupButton() {
  const { googleSignup } = useGoogleAuth();
  const { isSubmitting } = useLoginContext();

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: 'postmessage',
    onSuccess: async ({ code }) => {
      await googleSignup(code);
    },
    onError: (error) => {
      console.error('Google Login Failed:', error);
    },
  });

  return (
    <Button
      onClick={() => handleGoogleLogin()}
      className='flex w-full gap-1'
      disabled={isSubmitting}
    >
      <img className='w-5' src={GoogleIcon} />
      <span>Sign up with Google</span>
    </Button>
  );
}
