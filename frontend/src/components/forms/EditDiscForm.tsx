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
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { DialogFooter } from '../ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useRef, useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useEditDisc from '@/hooks/api/useEditDisc';
import useGetBags from '@/hooks/api/useGetBags';
import useGetBag from '@/hooks/api/useGetBag';
import { editDiscFormSchema } from '@/lib/formSchemas';
import { EditDiscFormProps } from '@/types/types';
import { Separator } from '../ui/separator';

export function EditDiscForm({ disc, setOpen }: EditDiscFormProps) {
  const [imageToggle, setImageToggle] = useState('colour');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { editDisc } = useEditDisc();
  const queryClient = useQueryClient();
  const { data: bags } = useGetBags();
  const { data: bag } = useGetBag({
    selectedBag: disc.bagID ? disc.bagID : '',
    enabled: disc.bagID ? true : false,
  });

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
      image: disc.image || '',
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

  // Function to handle image toggle
  function handleImageToggle(value: 'colour' | 'image') {
    setImageToggle(value);
    if (value === 'colour') {
      form.setValue('image', '');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  // Function to handle form submission
  function onSubmit(values: z.infer<typeof editDiscFormSchema>) {
    mutate({ ...values, image: values.image || '' });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-4'
      >
        <div className='mb-2 grid grid-flow-col grid-cols-2 grid-rows-2 gap-4'>
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
            defaultValue={disc?.plastic ? disc.plastic : ''}
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
            name='category'
            defaultValue={disc?.category ? disc.category : ''}
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
            defaultValue={disc.weight ? disc.weight : 175}
            name='weight'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`Weight (g)`}</FormLabel>
                <FormControl>
                  <Input placeholder='' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue={disc.bagID === bag?.id ? bag?.name : ''}
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
        <Separator className='my-2' />
        <div className='col-span-2 flex flex-col gap-4'>
          <RadioGroup
            defaultValue='colour'
            className='flex items-center gap-4'
            onValueChange={handleImageToggle}
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='colour' id='colour' />
              <Label htmlFor='colour'>Pick a colour</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='image' id='image' />
              <Label htmlFor='image'>Upload an image</Label>
            </div>
          </RadioGroup>
          {imageToggle === 'colour' && (
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
          )}
          {imageToggle === 'image' && (
            <FormField
              control={form.control}
              defaultValue={disc?.image ? disc.image : ''}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type='file' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
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
          defaultValue={disc.fade ? disc.fade : 0}
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
            aria-label='save changes disc button'
            className='w-full'
            type='submit'
            disabled={isPending}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
