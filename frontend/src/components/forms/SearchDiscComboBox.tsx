import { useCallback, useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { SearchedDisc } from '@/types/types';
import { SearchDiscForm } from '@/components/forms/SearchDiscForm';

const POPOVER_WIDTH = 'w-[250px]';

export function SearchDiscComboBox() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SearchedDisc | undefined>();

  const handleSetActive = useCallback((searchedDisc: SearchedDisc) => {
    setSelected(searchedDisc);
    setOpen(false);
  }, []);

  const displayName = selected ? selected.name : 'Find Disc';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className={cn('justify-between', POPOVER_WIDTH)}
        >
          {displayName}

          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent side='bottom' className={cn('p-0', POPOVER_WIDTH)}>
        <SearchDiscForm
          selectedResult={selected}
          onSelectResult={handleSetActive}
        />
      </PopoverContent>
    </Popover>
  );
}
