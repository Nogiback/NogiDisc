import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CirclePlus, CircleArrowRight } from 'lucide-react';
import { SearchDiscForm } from '@/components/forms/SearchDiscForm';
import { AddDiscForm } from '@/components/forms/AddDiscForm';
import { SearchedDisc } from '@/types/types';

export function AddDiscModal() {
  const [searchedDisc, setSearchedDisc] = useState<SearchedDisc | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='default'
          aria-label='add disc button'
          className='cursor-pointer bg-primary'
        >
          <span className='flex items-center sm:hidden'>
            <CirclePlus />
          </span>
          <span className='hidden items-center gap-1 sm:flex'>
            <CirclePlus /> Add Disc
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Disc</DialogTitle>
          <DialogDescription>
            Search for a disc or continue with a custom one.
          </DialogDescription>
        </DialogHeader>
        <SearchDiscForm setSearchedDisc={setSearchedDisc} />
        <DialogFooter>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                aria-label='continue to disc details button'
                className='flex w-full gap-1'
              >
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
