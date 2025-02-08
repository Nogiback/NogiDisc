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
    <Card className='w-72'>
      <CardHeader>
        <CardTitle className='text-lg'>{disc.name}</CardTitle>
        <CardDescription className='text-sm'>{`${disc.weight}g`}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center'>
        <div
          className='flex h-36 w-36 items-center justify-center rounded-full'
          style={{ backgroundColor: disc.colour }}
        >
          {disc.brand}
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-center justify-center'>
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  );
}
