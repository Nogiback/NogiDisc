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
import { Pencil, Trash } from 'lucide-react';

export default function DiscCard({ disc }: DiscCardProps) {
  return (
    <Card className='relative w-60'>
      <div className='absolute right-0 top-0 flex gap-0 p-0'>
        <Button
          size='sm'
          className='h-6 w-6 rounded-r-none rounded-tl-none'
          variant='outline'
        >
          <Pencil />
        </Button>
        <Button
          size='sm'
          className='h-6 w-6 rounded-l-none rounded-br-none'
          variant='outline'
        >
          <Trash className='text-destructive' />
        </Button>
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
          <p
            className='bg-inherit bg-clip-text font-bold text-transparent'
            style={{ filter: 'invert(1) grayscale(1) contrast(100)' }}
          >
            {disc.brand}
          </p>
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
