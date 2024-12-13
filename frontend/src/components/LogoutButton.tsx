import { Button } from './ui/button';
import useLogout from '@/hooks/useLogout';

export default function LogoutButton() {
  const { isLoading, logout } = useLogout();

  return (
    <Button onClick={logout} disabled={isLoading}>
      Logout
    </Button>
  );
}
