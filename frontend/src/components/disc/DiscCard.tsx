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

export default function DiscCard({ disc }: DiscCardProps) {
  return (
    <Card className='w-64'>
      <CardHeader>
        <CardTitle className='text-lg'>{disc.name}</CardTitle>
        <CardDescription className='text-sm'>{`${disc.weight}g`}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center'>
        <div
          className='flex h-36 w-36 items-center justify-center rounded-full'
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
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  );
}
