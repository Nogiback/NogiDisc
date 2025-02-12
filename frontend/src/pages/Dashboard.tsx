import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DiscsContainer from '@/components/dashboard/DiscsContainer';

export default function Dashboard() {
  const [selectedBag, setSelectedBag] = useState<string>('all');

  return (
    <SidebarProvider className='w-dvw overflow-y-auto overflow-x-hidden'>
      <AppSidebar setSelectedBag={setSelectedBag} />
      <SidebarInset>
        <DashboardHeader />
        <Separator orientation='horizontal' className='h-[1px] w-full' />
        <div className='flex w-full flex-col items-center justify-center gap-4 p-2'>
          <DiscsContainer selectedBag={selectedBag} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
