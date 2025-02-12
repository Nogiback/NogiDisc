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

  return (
    <div className='flex w-full flex-wrap items-center justify-center gap-2'>
      {discs?.map((disc) => <DiscCard disc={disc} key={disc.id} />)}
    </div>
  );
}
