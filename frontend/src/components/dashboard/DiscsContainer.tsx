import DiscCard from '@/components/disc/DiscCard';
import useGetBag from '@/hooks/api/useGetBag';
import useGetDiscs from '@/hooks/api/useGetDiscs';
import { DiscsContainerProps } from '@/types/types';

export default function DiscsContainer({ selectedBag }: DiscsContainerProps) {
  const { data: bag } = useGetBag({
    selectedBag,
    enabled: selectedBag !== 'all',
  });
  const { data: allDiscs } = useGetDiscs({ enabled: selectedBag === 'all' });

  const discs = selectedBag === 'all' ? allDiscs : bag?.discs;

  if (!discs || discs.length === 0) {
    return (
      <div className='mt-80 flex h-full w-full items-center justify-center'>
        <p className='text-2xl font-bold'>No discs here...</p>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-wrap items-center justify-center gap-2'>
      {discs?.map((disc) => <DiscCard disc={disc} key={disc.id} />)}
    </div>
  );
}
