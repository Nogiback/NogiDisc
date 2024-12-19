import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CirclePlus } from 'lucide-react';

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label='add disc button'
          className='fixed bottom-8 right-8 z-[99] flex h-10 w-28 cursor-pointer items-center justify-center rounded-full bg-white opacity-50 shadow-md transition duration-300 ease-in-out hover:opacity-100'
        >
          <CirclePlus size={24} /> Add Disc
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add a Disc</DialogTitle>
          <DialogDescription>
            Add a disc to your inventory or bag here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='discManufacturer' className='text-right'>
              Manufacturer
            </Label>
            <Input
              id='discManufacturer'
              defaultValue='Innova'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='discName' className='text-right'>
              Disc Name
            </Label>
            <Input
              id='discName'
              defaultValue='Destroyer'
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
