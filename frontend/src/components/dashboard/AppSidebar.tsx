import * as React from 'react';
import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
  LoaderPinwheel,
} from 'lucide-react';
import { NavBags } from './NavBags';
import { NavFilters } from '@/components/dashboard/NavFilters';
import { NavUser } from '@/components/dashboard/NavUser';
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

// This is sample data.
const data = {
  navBags: [
    {
      title: 'Bag 1',
    },
    { title: 'Bag 2' },
    { title: 'Bag 3' },
  ],
  navMain: [
    {
      title: 'Brand',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'MVP',
          url: '#',
        },
        {
          title: 'Innova',
          url: '#',
        },
        {
          title: 'Discmania',
          url: '#',
        },
      ],
    },
    {
      title: 'Molds',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Destroyer',
          url: '#',
        },
        {
          title: 'Hex',
          url: '#',
        },
        {
          title: 'Buzzz',
          url: '#',
        },
      ],
    },
    {
      title: 'Category',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Putter',
          url: '#',
        },
        {
          title: 'Midrange',
          url: '#',
        },
        {
          title: 'Fairway Driver',
          url: '#',
        },
        {
          title: 'Distance Driver',
          url: '#',
        },
      ],
    },
    {
      title: 'Speed',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: '1',
          url: '#',
        },
        {
          title: '2',
          url: '#',
        },
        {
          title: '3',
          url: '#',
        },
        {
          title: '4',
          url: '#',
        },
        {
          title: '5',
          url: '#',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible='icon' {...props}>
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
        <NavBags />
        <NavFilters items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
