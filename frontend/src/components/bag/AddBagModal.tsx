import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CirclePlus } from 'lucide-react';
import { AddBagForm } from '../forms/AddBagForm';
import { SidebarMenuButton } from '../ui/sidebar';

export function AddBagModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton aria-label='add bag button' className=''>
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
        <AddBagForm />
      </DialogContent>
    </Dialog>
  );
}
