import {
  ChevronRight,
  Building,
  Tag,
  Library,
  Rabbit,
  Plane,
  Wind,
  Beef,
  Eraser,
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
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect } from 'react';
import useGetBag from '@/hooks/api/useGetBag';
import useGetDiscs from '@/hooks/api/useGetDiscs';
import { useFilters } from '@/hooks/filtering/useFilters';

export function NavFilters({ selectedBag }: { selectedBag: string }) {
  const { data: bag } = useGetBag({
    selectedBag,
    enabled: selectedBag !== 'all',
  });
  const { data: allDiscs } = useGetDiscs({ enabled: selectedBag === 'all' });
  const {
    filterOptions,
    selectedFilters,
    updateFilterOptions,
    toggleFilter,
    clearFilters,
  } = useFilters();

  const discs = selectedBag === 'all' ? allDiscs : bag?.discs;

  useEffect(() => {
    if (discs && discs.length > 0) {
      updateFilterOptions(discs);
    } else {
      updateFilterOptions([]);
    }
  }, [discs, updateFilterOptions]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Filters</SidebarGroupLabel>
      <SidebarMenu>
        {/* Brand Filter */}
        <Collapsible asChild className='group/collapsible mb-1'>
          <SidebarMenuItem className='space-y-1'>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip='Brand'>
                <Building />
                Brand
                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className='space-y-2'>
                {[...filterOptions.brands].sort().map((brand) => (
                  <SidebarMenuSubItem key={brand}>
                    <div className='items-top flex space-x-2'>
                      <Checkbox
                        id={brand}
                        checked={selectedFilters.brands.includes(brand)}
                        onCheckedChange={() => toggleFilter('brands', brand)}
                      />
                      <div className='leading-none'>
                        <label
                          htmlFor={brand.toString()}
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                          {brand}
                        </label>
                      </div>
                    </div>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* Name Filter */}
        <Collapsible asChild className='group/collapsible mb-1'>
          <SidebarMenuItem className='space-y-1'>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip='Name'>
                <Tag />
                Name
                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className='space-y-2'>
                {[...filterOptions.names].sort().map((name) => (
                  <SidebarMenuSubItem key={name}>
                    <div className='items-top flex space-x-2'>
                      <Checkbox
                        id={name}
                        checked={selectedFilters.names.includes(name)}
                        onCheckedChange={() => toggleFilter('names', name)}
                      />
                      <div className='leading-none'>
                        <label
                          htmlFor={name}
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                          {name}
                        </label>
                      </div>
                    </div>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* Category Filter */}
        <Collapsible asChild className='group/collapsible mb-1'>
          <SidebarMenuItem className='space-y-1'>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip='Category'>
                <Library />
                Category
                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className='space-y-2'>
                {[...filterOptions.categories].sort().map((category) => (
                  <SidebarMenuSubItem key={category}>
                    <div className='items-top flex space-x-2'>
                      <Checkbox
                        id={category}
                        checked={selectedFilters.categories.includes(category)}
                        onCheckedChange={() =>
                          toggleFilter('categories', category)
                        }
                      />
                      <div className='leading-none'>
                        <label
                          htmlFor={category}
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                          {category}
                        </label>
                      </div>
                    </div>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* Speed Filter */}
        <Collapsible asChild className='group/collapsible mb-1'>
          <SidebarMenuItem className='space-y-1'>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip='Speed'>
                <Rabbit />
                Speed
                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className='space-y-2'>
                {[...filterOptions.speeds]
                  .sort((a, b) => a - b)
                  .map((speed) => (
                    <SidebarMenuSubItem key={speed}>
                      <div className='items-top flex space-x-2'>
                        <Checkbox
                          id={speed.toString()}
                          checked={selectedFilters.speeds.includes(speed)}
                          onCheckedChange={() => toggleFilter('speeds', speed)}
                        />
                        <div className='leading-none'>
                          <label
                            htmlFor={speed.toString()}
                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                          >
                            {speed}
                          </label>
                        </div>
                      </div>
                    </SidebarMenuSubItem>
                  ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* Glide Filter */}
        <Collapsible asChild className='group/collapsible mb-1'>
          <SidebarMenuItem className='space-y-1'>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip='Glide'>
                <Plane />
                Glide
                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className='space-y-2'>
                {[...filterOptions.glides]
                  .sort((a, b) => a - b)
                  .map((glide) => (
                    <SidebarMenuSubItem key={glide}>
                      <div className='items-top flex space-x-2'>
                        <Checkbox
                          id={glide.toString()}
                          checked={selectedFilters.glides.includes(glide)}
                          onCheckedChange={() => toggleFilter('glides', glide)}
                        />
                        <div className='leading-none'>
                          <label
                            htmlFor={glide.toString()}
                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                          >
                            {glide}
                          </label>
                        </div>
                      </div>
                    </SidebarMenuSubItem>
                  ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* Turn Filter */}
        <Collapsible asChild className='group/collapsible mb-1'>
          <SidebarMenuItem className='space-y-1'>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip='Turn'>
                <Wind />
                Turn
                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className='space-y-2'>
                {[...filterOptions.turns]
                  .sort((a, b) => a - b)
                  .map((turn) => (
                    <SidebarMenuSubItem key={turn}>
                      <div className='items-top flex space-x-2'>
                        <Checkbox
                          id={turn.toString()}
                          checked={selectedFilters.turns.includes(turn)}
                          onCheckedChange={() => toggleFilter('turns', turn)}
                        />
                        <div className='leading-none'>
                          <label
                            htmlFor={turn.toString()}
                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                          >
                            {turn}
                          </label>
                        </div>
                      </div>
                    </SidebarMenuSubItem>
                  ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* Fade Filter */}
        <Collapsible asChild className='group/collapsible mb-1'>
          <SidebarMenuItem className='space-y-1'>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip='Fade'>
                <Beef />
                Fade
                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className='space-y-2'>
                {[...filterOptions.fades]
                  .sort((a, b) => a - b)
                  .map((fade) => (
                    <SidebarMenuSubItem key={fade}>
                      <div className='items-top flex space-x-2'>
                        <Checkbox
                          id={fade.toString()}
                          checked={selectedFilters.fades.includes(fade)}
                          onCheckedChange={() => toggleFilter('fades', fade)}
                        />
                        <div className='leading-none'>
                          <label
                            htmlFor={fade.toString()}
                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                          >
                            {fade}
                          </label>
                        </div>
                      </div>
                    </SidebarMenuSubItem>
                  ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
        <SidebarMenuSubItem className='mt-2 space-y-2'>
          <SidebarMenuButton
            aria-label='clear filters button'
            className='bg-primary text-secondary'
            onClick={() => clearFilters()}
          >
            <Eraser />
            Clear Filters
          </SidebarMenuButton>
        </SidebarMenuSubItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
