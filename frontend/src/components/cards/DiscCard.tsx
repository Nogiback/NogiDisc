import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { DiscCardProps } from '@/types/types';
import { Pencil } from 'lucide-react';
import { DeleteDiscModal } from '../modals/DeleteDiscModal';
import { getBrandLogo } from '@/lib/getBrandLogo';

export default function DiscCard({ disc }: DiscCardProps) {
  const brandLogo = getBrandLogo(disc.brand);

  return (
    <Card className='relative w-60'>
      <div className='absolute right-0 top-0 flex gap-0 p-0'>
        <Button
          aria-label='edit disc button'
          size='sm'
          className='h-6 w-6 rounded-r-none rounded-tl-none'
          variant='outline'
        >
          <Pencil />
        </Button>
        <DeleteDiscModal discID={disc.id} />
      </div>
      <CardHeader>
        <div className='flex justify-between'>
          <div className=''>
            <CardTitle className='text-lg'>{disc.name}</CardTitle>
            <CardDescription className='text-xs'>{`${disc.plastic}, ${disc.weight}g`}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center'>
        <div
          className='flex h-32 w-32 items-center justify-center rounded-full'
          style={{ backgroundColor: disc.colour }}
        >
          {brandLogo && (
            <img
              alt={`${brandLogo} brand logo`}
              className='w-16 opacity-50'
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
      </CardContent>
      <CardFooter className='flex flex-col items-center justify-center'>
        <span className='text-md font-bold'>
          {disc.speed} / {disc.glide} / {disc.turn} / {disc.fade}
        </span>
      </CardFooter>
    </Card>
  );
}
