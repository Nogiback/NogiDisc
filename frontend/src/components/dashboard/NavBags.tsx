import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronRight, Backpack } from 'lucide-react';
import { DeleteBagModal } from '../modals/DeleteBagModal';
import { AddBagModal } from '../modals/AddBagModal';
import useGetBags from '@/hooks/api/useGetBags';
import { NavBagsProps } from '@/types/types';

export function NavBags({ setSelectedBag }: NavBagsProps) {
  const { data: bags } = useGetBags();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible asChild defaultOpen={true} className='group/collapsible'>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip='Bags'>
                <Backpack />
                <span>Bags</span>
                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <RadioGroup defaultValue='all' onValueChange={setSelectedBag}>
                  <SidebarMenuSubItem className='my-1 flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='all' id='All Discs' />
                      <Label
                        htmlFor='All Discs'
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        All Discs
                      </Label>
                    </div>
                  </SidebarMenuSubItem>
                  {bags?.map((bag) => (
                    <SidebarMenuSubItem
                      key={bag.id}
                      className='flex items-center justify-between'
                    >
                      <div className='flex items-center justify-between space-x-2'>
                        <RadioGroupItem value={bag.id} id={bag.name} />
                        <Label
                          htmlFor={bag.name}
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                          {bag.name}
                        </Label>
                      </div>
                      <DeleteBagModal bagID={bag.id} />
                    </SidebarMenuSubItem>
                  ))}
                </RadioGroup>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
        <SidebarMenuSubItem className='mt-2 space-y-2'>
          <AddBagModal />
        </SidebarMenuSubItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
