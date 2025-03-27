import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { AddBagForm } from '@/components/forms/AddBagForm';
import { useState } from 'react';
import { CirclePlus } from 'lucide-react';

export function AddBagModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton
          aria-label='add bag button'
          className='bg-primary text-secondary'
        >
          <CirclePlus size={24} /> Add Bag
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Bag</DialogTitle>
          <DialogDescription>
            Add a new bag to your inventory here.
          </DialogDescription>
        </DialogHeader>
        <AddBagForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
