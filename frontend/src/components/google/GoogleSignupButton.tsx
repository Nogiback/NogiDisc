import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button } from '../ui/button';

export function GoogleSignupButton() {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Send the token to the backend
        const { data } = await axios.post('/api/auth/google', {
          token: tokenResponse.access_token,
        });
        console.log('Access Token:', data.accessToken);

        // Store access token (and optionally refresh token)
        localStorage.setItem('accessToken', data.accessToken);
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    },
    onError: (error) => {
      console.error('Google Login Failed:', error);
    },
  });

  return (
    <Button onClick={() => handleGoogleLogin()} className='w-full'>
      Sign up with Google
    </Button>
  );
}