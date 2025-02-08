import DiscCard from '@/components/disc/DiscCard';
import useGetBag from '@/hooks/api/useGetBag';
import useGetDiscs from '@/hooks/api/useGetDiscs';
import { DiscContainerProps } from '@/types/types';

export default function DiscsContainer({ selectedBag }: DiscContainerProps) {
  const { data: bag } = useGetBag(selectedBag);
  const { data: discs } = useGetDiscs();

  if (selectedBag === 'all') {
    return (
      <div className=''>
        {discs?.map((disc) => <DiscCard disc={disc} key={disc.id} />)}
      </div>
    );
  } else {
    return (
      <div className=''>
        {bag?.discs?.map((disc) => <DiscCard disc={disc} key={disc.id} />)}
      </div>
    );
  }
}
