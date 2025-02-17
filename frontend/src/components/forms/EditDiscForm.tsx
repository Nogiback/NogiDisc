import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useEditDisc from '@/hooks/api/useEditDisc';
import { editDiscFormSchema } from '@/lib/formSchemas';
import { DialogFooter } from '../ui/dialog';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { EditDiscFormProps } from '@/types/types';
import useGetBags from '@/hooks/api/useGetBags';

export function EditDiscForm({ disc, setOpen }: EditDiscFormProps) {
  const { editDisc } = useEditDisc();
  const queryClient = useQueryClient();
  const { data: bags } = useGetBags();

  const form = useForm<z.infer<typeof editDiscFormSchema>>({
    resolver: zodResolver(editDiscFormSchema),
    defaultValues: {
      id: disc.id,
      brand: disc.brand || '',
      name: disc.name || '',
      category: disc.category || '',
      plastic: disc.plastic || '',
      colour: disc.colour || '',
      weight: disc.weight || 175,
      speed: disc.speed || 0,
      glide: disc.glide || 0,
      turn: disc.turn || 0,
      fade: disc.fade || 0,
      bagID: disc.bagID || '',
    },
  });

  // React-Query mutation hook to edit disc
  const { mutate, isPending } = useMutation({
    mutationFn: editDisc,
    onSuccess: () => {
      queryClient.invalidateQueries();
      setOpen(false);
    },
  });

  // Function to handle form submission
  function onSubmit(values: z.infer<typeof editDiscFormSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-4'
      >
        <div className='grid grid-flow-col grid-cols-2 grid-rows-3 gap-4'>
          <FormField
            control={form.control}
            defaultValue={disc?.brand ? disc.brand : ''}
            name='brand'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder='' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='plastic'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plastic Type</FormLabel>
                <FormControl>
                  <Input placeholder='' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue={disc?.name ? disc.name : ''}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Disc Name</FormLabel>
                <FormControl>
                  <Input placeholder='' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue={disc?.colour ? disc.colour : ''}
            name='colour'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colour</FormLabel>
                <FormControl>
                  <Input type='color' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category'
            defaultValue={disc.category ? disc.category : ''}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Category...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Putter'>Putter</SelectItem>
                    <SelectItem value='Approach'>Approach</SelectItem>
                    <SelectItem value='Midrange'>Midrange</SelectItem>
                    <SelectItem value='Control Driver'>
                      Control Driver
                    </SelectItem>
                    <SelectItem value='Hybrid Driver'>Hybrid Driver</SelectItem>
                    <SelectItem value='Distance Driver'>
                      Distance Driver
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bagID'
            defaultValue={disc.bag ? disc.bag.name : ''}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bag</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Bag...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bags?.length
                      ? bags?.map((bag) => (
                          <SelectItem key={bag.id} value={bag.id}>
                            {bag.name}
                          </SelectItem>
                        ))
                      : null}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='weight'
          defaultValue={disc.weight ? disc.weight : 175}
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>{`Weight (${value}g)`}</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={200}
                  step={1}
                  defaultValue={[value]}
                  onValueChange={(v) => onChange(v[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={disc?.speed ? disc.speed : 1}
          name='speed'
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>{`Speed: (${value})`}</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={14.5}
                  step={0.5}
                  defaultValue={[value]}
                  onValueChange={(v) => onChange(v[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={disc?.glide ? disc.glide : 1}
          name='glide'
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>{`Glide: (${value})`}</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={7}
                  step={0.5}
                  defaultValue={[value]}
                  onValueChange={(v) => onChange(v[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={disc.turn ? disc.turn : -7}
          name='turn'
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>{`Turn: (${value})`}</FormLabel>
              <FormControl>
                <Slider
                  min={-7}
                  max={1}
                  step={0.5}
                  defaultValue={[value]}
                  onValueChange={(v) => onChange(v[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={disc.turn ? disc.turn : 0}
          name='fade'
          render={({ field: { value, onChange } }) => (
            <FormItem className='mb-6'>
              <FormLabel>{`Fade: (${value})`}</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={5}
                  step={0.5}
                  defaultValue={[value]}
                  onValueChange={(v) => onChange(v[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            aria-label='confirm edit disc button'
            className='w-full'
            type='submit'
            disabled={isPending}
          >
            Edit Disc
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
