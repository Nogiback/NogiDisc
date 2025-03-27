import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DialogDescription } from '@radix-ui/react-dialog';
import useDeleteBag from '@/hooks/api/useDeleteBag';

export function DeleteBagModal({ bagID }: { bagID: string }) {
  const { deleteBag } = useDeleteBag();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (bagID: string) => deleteBag(bagID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discs'] });
      queryClient.invalidateQueries({ queryKey: ['bags'] });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label='delete bag button'
          size='sm'
          className='h-6 w-6 bg-inherit'
          variant='outline'
        >
          <Trash className='text-destructive' />
        </Button>
      </DialogTrigger>
      <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this bag? All discs in this bag will
          be moved to your default inventory.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={() => mutate(bagID)} disabled={isPending}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
