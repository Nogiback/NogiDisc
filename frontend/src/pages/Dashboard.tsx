import { useAuth } from '@/hooks/auth/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AddDiscModal } from '@/components/disc/AddDiscModal';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import LogoutButton from '@/components/LogoutButton';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import DiscCard from '@/components/disc/DiscCard';

export default function Dashboard() {
  const { authUser } = useAuth();

  return (
    <SidebarProvider className='flex h-screen w-screen'>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex w-full justify-between px-4'>
            <div className='flex items-center gap-2'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
              <h1 className='text-xl font-bold'>Dashboard</h1>
            </div>
            <DarkModeToggle />
          </div>
        </header>
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
          <DiscCard />
          <LogoutButton />
          <AddDiscModal />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
