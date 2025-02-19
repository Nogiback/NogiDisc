import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DiscsContainer from '@/components/dashboard/DiscsContainer';

export default function Dashboard() {
  const [selectedBag, setSelectedBag] = useState<string>('all');

  return (
    <SidebarProvider className='w-dvw'>
      <AppSidebar selectedBag={selectedBag} setSelectedBag={setSelectedBag} />
      <SidebarInset>
        <div className='sticky top-0 z-50 bg-inherit'>
          <DashboardHeader />
          <Separator orientation='horizontal' className='h-[1px] w-full' />
        </div>
        <div className='flex w-full flex-col items-center justify-center gap-4 p-2'>
          <DiscsContainer selectedBag={selectedBag} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
