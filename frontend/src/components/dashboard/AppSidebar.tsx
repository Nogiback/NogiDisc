import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { LoaderPinwheel } from 'lucide-react';
import { NavBags } from './NavBags';
import { NavFilters } from '@/components/dashboard/NavFilters';
import { NavUser } from '@/components/dashboard/NavUser';
import { AppSidebarProps } from '@/types/types';

export function AppSidebar({ selectedBag, setSelectedBag }: AppSidebarProps) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link to='/' className='text-primary'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <LoaderPinwheel className='size-4' />
                </div>
                {open ? (
                  <h1 className='py-4 text-center text-xl font-bold'>
                    NogiDisc
                  </h1>
                ) : null}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavBags setSelectedBag={setSelectedBag} />
        <NavFilters selectedBag={selectedBag} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
