import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Checkbox } from '../ui/checkbox';
import { AddBagModal } from '../bag/AddBagModal';

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
          <SidebarMenuSub key={item.title} className='space-y-2'>
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
          <AddBagModal />
        </SidebarMenuSubItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
