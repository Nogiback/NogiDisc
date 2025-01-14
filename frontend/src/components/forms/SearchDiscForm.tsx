import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import type { SearchedDisc, SearchResponse } from '@/types/types';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';

interface SearchProps {
  selectedResult?: SearchedDisc;
  onSelectResult: (searchedDisc: SearchedDisc) => void;
}

export function SearchDiscForm({
  selectedResult,
  onSelectResult,
}: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectResult = (searchedDisc: SearchedDisc) => {
    onSelectResult(searchedDisc);
    setSearchQuery('');
  };

  return (
    <>
      <Command
        shouldFilter={false}
        className='h-auto rounded-lg border border-b-0 shadow-md'
      >
        <CommandInput
          value={searchQuery}
          onValueChange={setSearchQuery}
          placeholder='Search for disc'
        />

        <SearchResults
          query={searchQuery}
          selectedResult={selectedResult}
          onSelectResult={handleSelectResult}
        />
      </Command>
    </>
  );
}

interface SearchResultsProps {
  query: string;
  selectedResult: SearchProps['selectedResult'];
  onSelectResult: SearchProps['onSelectResult'];
}

function SearchResults({
  query,
  selectedResult,
  onSelectResult,
}: SearchResultsProps) {
  const [debouncedSearchQuery] = useDebounce(query, 500);

  const enabled = !!debouncedSearchQuery;

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery<SearchResponse>({
    queryKey: ['search', debouncedSearchQuery],
    queryFn: async () => {
      const res: SearchResponse = await axios.get(
        `https://discit-api.fly.dev/disc?name=${debouncedSearchQuery}`,
      );
      return res;
    },
    enabled,
  });

  const isLoading = enabled && isLoadingOrig;

  if (!enabled) return null;

  return (
    <CommandList>
      {isLoading && (
        <div role='alert' aria-busy='true' className='p-4 text-sm'>
          Searching...
        </div>
      )}
      {!isError && !isLoading && !data?.searchedDiscs.length && (
        <div className='p-4 text-sm'>No products found</div>
      )}
      {isError && <div className='p-4 text-sm'>Something went wrong</div>}

      {data?.searchedDiscs.map(
        ({ id, name, brand, speed, glide, turn, fade }) => {
          return (
            <CommandItem
              key={id}
              onSelect={() =>
                onSelectResult({ id, name, brand, speed, glide, turn, fade })
              }
              value={name}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  selectedResult?.id === id ? 'opacity-100' : 'opacity-0',
                )}
              />
              {name}
            </CommandItem>
          );
        },
      )}
    </CommandList>
  );
}
