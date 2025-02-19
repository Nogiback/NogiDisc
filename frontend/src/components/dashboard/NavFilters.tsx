import {
  ChevronRight,
  Building,
  Tag,
  Library,
  Rabbit,
  Plane,
  Wind,
  Beef,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Checkbox } from '../ui/checkbox';
import useGetBag from '@/hooks/api/useGetBag';
import useGetDiscs from '@/hooks/api/useGetDiscs';
import { DiscFilters } from '@/types/types';

const filterLabels = [
  {
    name: 'brand',
    icon: <Building />,
  },
  {
    name: 'name',
    icon: <Tag />,
  },
  {
    name: 'category',
    icon: <Library />,
  },
  {
    name: 'speed',
    icon: <Rabbit />,
  },
  { name: 'glide', icon: <Plane /> },
  {
    name: 'turn',
    icon: <Wind />,
  },
  { name: 'fade', icon: <Beef /> },
];

export function NavFilters({ selectedBag }: { selectedBag: string }) {
  const { data: bag } = useGetBag({
    selectedBag,
    enabled: selectedBag !== 'all',
  });
  const { data: allDiscs } = useGetDiscs({ enabled: selectedBag === 'all' });

  const discs = selectedBag === 'all' ? allDiscs : bag?.discs;

  function getUniqueValues(key: keyof DiscFilters) {
    const values = Array.from(new Set(discs?.map((disc) => disc[key])));
    return values.sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      }
      return String(a).localeCompare(String(b));
    });
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Filters</SidebarGroupLabel>
      <SidebarMenu>
        {filterLabels.map((category) => (
          <Collapsible
            key={category.name}
            asChild
            defaultOpen={category.name === 'brand'}
            className='group/collapsible mb-1'
          >
            <SidebarMenuItem className='space-y-1'>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={
                    category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)
                  }
                >
                  {category.icon}
                  <span>
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </span>
                  <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className='space-y-2'>
                  {getUniqueValues(category.name as keyof DiscFilters).map(
                    (filterItem) => (
                      <SidebarMenuSubItem key={filterItem}>
                        <div className='items-top flex space-x-2'>
                          <Checkbox id={filterItem.toString()} />
                          <div className='leading-none'>
                            <label
                              htmlFor={filterItem.toString()}
                              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                              {filterItem}
                            </label>
                          </div>
                        </div>
                      </SidebarMenuSubItem>
                    ),
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
