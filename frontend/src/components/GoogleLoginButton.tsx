import { GoogleLogin, GoogleCredentialResponse } from '@react-oauth/google';
import axios from 'axios';

export function GoogleLoginButton() {
  const handleGoogleLoginSuccess = async (
    response: GoogleCredentialResponse,
  ) => {
    try {
      // Send the Google token to your backend
      const { data } = await axios.post('/api/auth/google', {
        token: response.credential,
      });

      // Save the JWT token in localStorage or context
      localStorage.setItem('token', data.token);

      console.log('Logged in user:', data.user);
    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => {
          console.error('Google Login Failed');
        }}
      />
    </div>
  );
}
