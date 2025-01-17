import { useAuth } from '@/context/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AddDiscModal } from '@/components/disc/AddDiscModal';
import { NavBar } from '@/components/dashboard/Navbar';

export default function Dashboard() {
  const { authUser } = useAuth();

  return (
    <>
      <NavBar />
      <div className='flex h-screen w-screen flex-col items-center justify-center gap-4'>
        <h1>Dashboard</h1>
        <p>{`Hello, ${authUser?.firstName}!`}</p>
        <p>{authUser?.email}</p>
        <Avatar>
          <AvatarImage
            src={authUser?.profilePic}
            referrerPolicy='no-referrer'
          />
          <AvatarFallback>{`${authUser?.firstName[0]}${authUser?.lastName[0]}`}</AvatarFallback>
        </Avatar>
        <AddDiscModal />
      </div>
    </>
  );
}
