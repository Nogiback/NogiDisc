import { useAuth } from '@/hooks/auth/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AddDiscModal } from '@/components/disc/AddDiscModal';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import LogoutButton from '@/components/LogoutButton';
import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DiscsContainer from '@/components/dashboard/DiscsContainer';

export default function Dashboard() {
  const [selectedBag, setSelectedBag] = useState<string>('all');
  const { authUser } = useAuth();

  return (
    <SidebarProvider className='flex h-screen w-screen'>
      <AppSidebar setSelectedBag={setSelectedBag} />
      <SidebarInset>
        <DashboardHeader />
        <Separator orientation='horizontal' className='h-[1px] w-full' />
        <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
          <h1>Dashboard</h1>
          <p>{`Hello, ${authUser?.firstName}!`}</p>
          <Avatar>
            <AvatarImage
              src={authUser?.profilePic}
              referrerPolicy='no-referrer'
            />
            <AvatarFallback>{`${authUser?.firstName[0]}${authUser?.lastName[0]}`}</AvatarFallback>
          </Avatar>
          <DiscsContainer selectedBag={selectedBag} />
          <LogoutButton />
          <AddDiscModal />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
