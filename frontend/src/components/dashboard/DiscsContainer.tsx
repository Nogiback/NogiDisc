import DiscCard from '@/components/cards/DiscCard';
import useGetBag from '@/hooks/api/useGetBag';
import useGetDiscs from '@/hooks/api/useGetDiscs';
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

  const discs = selectedBag === 'all' ? allDiscs : bag?.discs;

  // Sorting disc based on speed and then by name
  const sortedDiscs = discs?.sort((disc1, disc2) => {
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
      {/* TODO: Need to decide later if charts should be added to final version*/}
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
