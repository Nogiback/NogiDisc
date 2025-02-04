import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';

export default function DiscCard() {
  const dummyDisc = {
    name: 'Disc Name',
    brand: 'Disc Brand',
    type: 'Disc Type',
    colour: '#f542ef',
    weight: 175,
    speed: 9,
    glide: 5,
    turn: -1,
    fade: 2,
  };

  return (
    <Card className='w-72'>
      <CardHeader>
        <CardTitle className='text-lg'>{dummyDisc.name}</CardTitle>
        <CardDescription className='text-sm'>{`${dummyDisc.weight}g`}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center'>
        <div
          className='flex h-36 w-36 items-center justify-center rounded-full'
          style={{ backgroundColor: dummyDisc.colour }}
        >
          {dummyDisc.brand}
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-center justify-center'>
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  );
}
