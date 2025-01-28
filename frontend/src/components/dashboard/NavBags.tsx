import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Checkbox } from '../ui/checkbox';
import { CirclePlusIcon } from 'lucide-react';

export function NavBags({
  items,
}: {
  items: {
    title: string;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Bags</SidebarGroupLabel>
      <SidebarMenu className='space-y-2'>
        {items.map((item) => (
          <SidebarMenuSub className='space-y-2'>
            <SidebarMenuSubItem key={item.title}>
              <div className='items-top flex space-x-2'>
                <Checkbox id={item.title} />
                <div className='leading-none'>
                  <label
                    htmlFor={item.title}
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {item.title}
                  </label>
                </div>
              </div>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        ))}
        <SidebarMenuSubItem className='space-y-2'>
          <SidebarMenuButton
            variant='default'
            className='bg-primary text-secondary'
          >
            <CirclePlusIcon />
            Create New Bag
          </SidebarMenuButton>
        </SidebarMenuSubItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
