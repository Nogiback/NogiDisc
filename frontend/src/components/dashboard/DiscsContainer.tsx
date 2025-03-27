import { useEffect, useState } from 'react';
import DiscCard from '@/components/cards/DiscCard';
import useGetBag from '@/hooks/api/useGetBag';
import useGetDiscs from '@/hooks/api/useGetDiscs';
import { useFilters } from '@/hooks/filtering/useFilters';
import { Disc } from '@prisma/client';
import { filterDiscs } from '@/lib/filterDiscs';
import { DiscsContainerProps } from '@/types/types';
import DiscCardList from '../cards/DiscCardList';
// import { CategoryChart } from '../charts/CategoryChart';
// import { BrandsChart } from '../charts/BrandsChart';

export default function DiscsContainer({
  toggleView,
  selectedBag,
}: DiscsContainerProps) {
  const { data: bag } = useGetBag({
    selectedBag,
    enabled: selectedBag !== 'all',
  });
  const { data: allDiscs } = useGetDiscs({ enabled: selectedBag === 'all' });
  const { selectedFilters, updateFilterOptions } = useFilters();
  const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>([]);

  const discs = selectedBag === 'all' ? allDiscs : bag?.discs;

  // Update filter options when bag changes
  useEffect(() => {
    if (discs) {
      updateFilterOptions(discs);
      setFilteredDiscs(discs);
    }
  }, [discs, updateFilterOptions]);

  // Apply filters when selections change
  useEffect(() => {
    if (discs) {
      const filtered = filterDiscs(discs, selectedFilters);
      setFilteredDiscs(filtered);
    }
  }, [selectedFilters, discs]);

  // Sorting disc based on speed and then by name
  const sortedDiscs = filteredDiscs?.sort((disc1, disc2) => {
    // Primary sorting by value
    if (disc1.speed !== disc2.speed) {
      return disc2.speed - disc1.speed;
    }
    // Secondary sorting by name (alphabetical order)
    return disc1.name.localeCompare(disc2.name);
  });

  if (!discs || discs.length === 0) {
    return (
      <div className='mt-80 flex h-full w-full items-center justify-center'>
        <p className='text-2xl font-bold'>No discs here...</p>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-wrap items-center justify-center gap-2'>
      {/* TODO: Need to decide later if charts should be added to final version */}
      {/* <CategoryChart discs={discs} />
      <BrandsChart discs={discs} /> */}
      {toggleView === 'grid' && (
        <div className='flex w-full flex-wrap items-center justify-center gap-2'>
          {sortedDiscs?.map((disc) => <DiscCard disc={disc} key={disc.id} />)}
        </div>
      )}
      {toggleView === 'list' && (
        <div className='flex w-full flex-col flex-wrap items-center justify-center gap-2'>
          {sortedDiscs?.map((disc) => (
            <DiscCardList disc={disc} key={disc.id} />
          ))}
        </div>
      )}
    </div>
  );
}
