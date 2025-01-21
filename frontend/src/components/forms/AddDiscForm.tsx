import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useAddDisc from '@/hooks/api/useAddDisc';
import { useAuth } from '@/context/useAuth';
import { addDiscFormSchema } from '@/lib/formSchemas';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { SearchedDisc } from '@/types/types';

interface AddDiscFormProps {
  searchedDisc: SearchedDisc | null;
}

export function AddDiscForm({ searchedDisc }: AddDiscFormProps) {
  const { addDisc, isLoading } = useAddDisc();
  const { authUser } = useAuth();

  const form = useForm<z.infer<typeof addDiscFormSchema>>({
    resolver: zodResolver(addDiscFormSchema),
    defaultValues: {
      manufacturer: searchedDisc?.brand || '',
      name: searchedDisc?.name || '',
      category: searchedDisc?.category || '',
      plastic: '',
      colour: '',
      weight: 175,
      speed: Number(searchedDisc?.speed) || 0,
      glide: Number(searchedDisc?.glide) || 0,
      turn: Number(searchedDisc?.turn) || 0,
      fade: Number(searchedDisc?.fade) || 0,
      bagID: '',
    },
  });

  async function onSubmit(values: z.infer<typeof addDiscFormSchema>) {
    await addDisc(values);
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
            defaultValue={searchedDisc?.brand ? searchedDisc.brand : ''}
            name='manufacturer'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturer</FormLabel>
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
            defaultValue={searchedDisc?.name ? searchedDisc.name : ''}
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
            defaultValue={searchedDisc?.category ? searchedDisc.category : ''}
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
                    {authUser?.bags?.length
                      ? authUser?.bags?.map((bag) => (
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
          defaultValue={searchedDisc?.speed ? Number(searchedDisc.speed) : 1}
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
          defaultValue={searchedDisc?.glide ? Number(searchedDisc.glide) : 1}
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
          defaultValue={searchedDisc?.turn ? Number(searchedDisc.turn) : -7}
          name='turn'
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>{`Turn: (${value})`}</FormLabel>
              <FormControl>
                <Slider
                  min={-7}
                  max={0}
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
          defaultValue={searchedDisc?.fade ? Number(searchedDisc.fade) : 0}
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
          <DialogClose asChild>
            <Button className='w-full' type='submit' disabled={isLoading}>
              Add Disc
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
