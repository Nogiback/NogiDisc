import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/auth/useAuth';
import axios from 'axios';

export default function VerifyEmail() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAccessToken } = useAuth();

  // Optionally get email from navigation state if passed during signup
  const email = location.state?.email || '';

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Email is missing. Please sign in again.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/verify-email', {
        email,
        code,
      });
      toast.success(response.data.message || 'Email verified successfully!');
      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
            'Verification failed. Please try again.',
        );
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error('Email is missing.');
      return;
    }
    try {
      await axios.post('/api/auth/resend-verification', { email });
      toast.success('Verification code resent. Please check your email.');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
            'Failed to resend code. Please try again.',
        );
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
        <CardDescription>
          We sent a 6-digit verification code to {email || 'your email'}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='code'>Verification Code</Label>
            <Input
              id='code'
              placeholder='123456'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              required
            />
          </div>
          <Button
            type='submit'
            className='w-full'
            disabled={isLoading || code.length !== 6}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Button
          variant='link'
          onClick={handleResend}
          className='text-sm text-muted-foreground'
        >
          Didn't receive a code? Resend
        </Button>
      </CardFooter>
    </Card>
  );
}
