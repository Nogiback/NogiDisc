import { Card, CardContent } from '@/components/ui/card';
import { DiscCardListProps } from '@/types/types';
import { DeleteDiscModal } from '@/components/modals/DeleteDiscModal';
import { EditDiscModal } from '@/components/modals/EditDiscModal';
import { getBrandLogo } from '@/lib/getBrandLogo';

export default function DiscCardList({ disc }: DiscCardListProps) {
  const brandLogo = getBrandLogo(disc.brand);

  return (
    <Card className='group relative flex w-[96%] hover:border-black dark:hover:border-white'>
      <div className='absolute right-0 top-0 flex'>
        <EditDiscModal disc={disc} />
        <DeleteDiscModal discID={disc.id} />
      </div>
      <CardContent className='flex w-full items-center justify-start gap-6 p-4'>
        {!disc.image && (
          <div
            className='flex h-28 w-28 items-center justify-center rounded-full group-hover:animate-[spin_0.5s_linear_infinite]'
            style={{ backgroundColor: disc.colour ? disc.colour : 'gray' }}
          >
            {brandLogo && (
              <img
                alt={`${brandLogo} brand logo`}
                className='w-12 opacity-50'
                src={brandLogo}
              ></img>
            )}
            {!brandLogo && (
              <p
                aria-label={`${disc.brand} brand logo`}
                className='bg-inherit bg-clip-text text-center font-bold text-transparent opacity-50'
                style={{ filter: 'invert(1) grayscale(1) contrast(100)' }}
              >
                {disc.brand}
              </p>
            )}
          </div>
        )}
        {disc.image && (
          <img
            alt={`${disc.name} disc image`}
            className='h-28 w-28 rounded-full object-cover group-hover:animate-[spin_0.5s_linear_infinite]'
            src={disc.image}
          ></img>
        )}
        <div className='flex flex-col items-start justify-center'>
          <h3 className='text-2xl font-bold'>{disc.name}</h3>
          <span>
            {disc.plastic}, {disc.weight}g
          </span>
          <span className='text-md mt-4 font-bold'>
            {disc.speed} / {disc.glide} / {disc.turn} / {disc.fade}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
