import { DarkModeToggle } from '@/components/DarkModeToggle';
import LogoutButton from '@/components/LogoutButton';
import { useAuth } from '@/context/useAuth';

export default function Dashboard() {
  const { authUser } = useAuth();
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-4'>
      <h1>Dashboard</h1>
      <p>{`Hello, ${authUser?.firstName}!`}</p>
      <p>{authUser?.email}</p>
      <img src={authUser?.profilePic} key={authUser?.id} className='w-48'></img>
      <LogoutButton />
      <DarkModeToggle />
    </div>
  );
}
