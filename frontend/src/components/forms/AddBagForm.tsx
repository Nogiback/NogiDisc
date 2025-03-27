import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useAddBag from '@/hooks/api/useAddBag';
import { addBagFormSchema } from '@/lib/formSchemas';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AddBagFormProps } from '@/types/types';

export function AddBagForm({ setOpen }: AddBagFormProps) {
  const { addBag } = useAddBag();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof addBagFormSchema>>({
    resolver: zodResolver(addBagFormSchema),
    defaultValues: {
      name: '',
    },
  });

  // React-Query mutation hook to add bag
  const { mutate, isPending } = useMutation({
    mutationFn: addBag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bags'] });
      setOpen(false);
    },
  });

  // Function to handle form submission
  function onSubmit(values: z.infer<typeof addBagFormSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-4'
      >
        <FormField
          control={form.control}
          defaultValue=''
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bag Name</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            aria-label='confirm add bag button'
            className='w-full'
            type='submit'
            disabled={isPending}
          >
            Add Bag
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
