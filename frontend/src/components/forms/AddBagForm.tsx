import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useAddBag from '@/hooks/api/useAddBag';
import { addBagFormSchema } from '@/lib/formSchemas';
import { DialogClose, DialogFooter } from '../ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export function AddBagForm() {
  const { addBag, isLoading } = useAddBag();

  const form = useForm<z.infer<typeof addBagFormSchema>>({
    resolver: zodResolver(addBagFormSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof addBagFormSchema>) {
    await addBag(values);
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
          <DialogClose asChild>
            <Button className='w-full' type='submit' disabled={isLoading}>
              Add Bag
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
