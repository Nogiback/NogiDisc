import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { DarkModeToggle } from '../DarkModeToggle';

export default function DashboardHeader() {
  return (
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
  );
}
