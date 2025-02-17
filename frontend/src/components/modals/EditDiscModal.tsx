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
import { Pencil } from 'lucide-react';
import { EditDiscForm } from '../forms/EditDiscForm';
import { Disc } from '@/types/types';

export function EditDiscModal({ disc }: { disc: Disc }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label='edit disc button'
          size='sm'
          className='h-6 w-6 rounded-r-none rounded-tl-none'
          variant='outline'
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Disc</DialogTitle>
          <DialogDescription>Update the disc details below</DialogDescription>
        </DialogHeader>
        <EditDiscForm disc={disc} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
