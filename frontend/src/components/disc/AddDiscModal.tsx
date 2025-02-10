import { useState } from 'react';
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
import { CirclePlus, CircleArrowRight } from 'lucide-react';
import { SearchDiscForm } from '../forms/SearchDiscForm';
import { SearchedDisc } from '@/types/types';
import { AddDiscForm } from '../forms/AddDiscForm';

export function AddDiscModal() {
  const [searchedDisc, setSearchedDisc] = useState<SearchedDisc | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label='add disc button'
          className='z-[99] flex h-9 w-28 cursor-pointer items-center justify-center bg-primary'
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
        <DialogFooter>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button aria-label='add disc button' className='w-full'>
                Continue
                <CircleArrowRight size={24} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a Disc</DialogTitle>
                <DialogDescription>
                  Add a disc to your inventory or bag here.
                </DialogDescription>
              </DialogHeader>
              <AddDiscForm searchedDisc={searchedDisc} setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
