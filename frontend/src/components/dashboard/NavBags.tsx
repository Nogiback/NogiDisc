import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Checkbox } from '../ui/checkbox';
import { AddBagModal } from '../bag/AddBagModal';
import useGetBags from '@/hooks/api/useGetBags';

export function NavBags() {
  const { data: bags } = useGetBags();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Bags</SidebarGroupLabel>
      <SidebarMenu className='space-y-2'>
        {bags?.map((bag) => (
          <SidebarMenuSub key={bag.id} className='space-y-2'>
            <SidebarMenuSubItem key={bag.id}>
              <div className='items-top flex space-x-2'>
                <Checkbox id={bag.name} />
                <div className='leading-none'>
                  <label
                    htmlFor={bag.name}
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {bag.name}
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
