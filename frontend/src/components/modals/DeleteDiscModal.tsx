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
import useDeleteDisc from '@/hooks/api/useDeleteDisc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DialogDescription } from '@radix-ui/react-dialog';

export function DeleteDiscModal({ discID }: { discID: string }) {
  const { deleteDisc } = useDeleteDisc();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (discID: string) => deleteDisc(discID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discs'] });
      queryClient.invalidateQueries({ queryKey: ['bags'] });
      queryClient.invalidateQueries({ queryKey: ['bag'] });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label='delete disc button'
          size='sm'
          className='h-6 w-6 rounded-l-none rounded-br-none'
          variant='outline'
        >
          <Trash className='text-destructive' />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-96'>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this disc?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={() => mutate(discID)} disabled={isPending}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
