import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CirclePlus } from 'lucide-react';
import { SearchDiscForm } from '../forms/SearchDiscForm';
// import { AddDiscForm } from '../forms/AddDiscForm';

export function AddDiscModal() {
  const [searchedDisc, setSearchedDisc] = useState<string | null>('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label='add disc button'
          className='fixed bottom-8 right-8 z-[99] flex h-10 w-28 cursor-pointer items-center justify-center bg-primary opacity-50 shadow-md transition duration-300 ease-in-out hover:opacity-100'
        >
          <CirclePlus size={24} /> Add Disc
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Disc</DialogTitle>
          <DialogDescription>
            Add a disc to your inventory or bag here.
          </DialogDescription>
        </DialogHeader>
        <SearchDiscForm setSearchedDisc={setSearchedDisc} />
        {/* <AddDiscForm /> */}
        {searchedDisc}
      </DialogContent>
    </Dialog>
  );
}
