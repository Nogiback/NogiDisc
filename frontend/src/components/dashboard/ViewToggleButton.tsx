import { ToggleViewButtonProps } from '@/types/types';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { List, LayoutGrid } from 'lucide-react';

export default function ToggleViewButton({
  toggleView,
  setToggleView,
}: ToggleViewButtonProps) {
  return (
    <ToggleGroup
      className='gap-0 rounded-lg border-2'
      variant='default'
      type='single'
      defaultValue='grid'
      onValueChange={(value) => {
        if (value) setToggleView(value);
      }}
    >
      <ToggleGroupItem
        value='list'
        aria-label='Toggle list view'
        className='rounded-r-none'
        disabled={toggleView === 'list'}
      >
        <List className='h-4 w-4' />
      </ToggleGroupItem>
      <ToggleGroupItem
        value='grid'
        aria-label='Toggle grid view'
        className='rounded-l-none'
        disabled={toggleView === 'grid'}
      >
        <LayoutGrid className='h-4 w-4' />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
