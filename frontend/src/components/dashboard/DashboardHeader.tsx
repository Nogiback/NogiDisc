import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { DarkModeToggle } from '../DarkModeToggle';
import { AddDiscModal } from '../modals/AddDiscModal';

export default function DashboardHeader() {
  return (
    <header className='flex h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16'>
      <div className='flex w-full justify-between px-4'>
        <div className='flex items-center gap-2'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <h1 className='text-xl font-bold'>Dashboard</h1>
        </div>
        <div className='mr-2 flex items-center gap-2'>
          <AddDiscModal />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
