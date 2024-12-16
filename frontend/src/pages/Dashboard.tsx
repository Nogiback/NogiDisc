import LogoutButton from '@/components/LogoutButton';
import { useAuth } from '@/context/useAuth';

export default function Dashboard() {
  const { authUser } = useAuth();
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-4'>
      <h1>Dashboard</h1>
      <p>{`Hello, ${authUser?.firstName}!`}</p>
      <p>{authUser?.email}</p>
      <img src={authUser?.profilePic} className='w-24'></img>
      <LogoutButton />
    </div>
  );
}
