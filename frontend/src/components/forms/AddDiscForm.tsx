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
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useAddDisc from '@/hooks/api/useAddDisc';
import useGetBags from '@/hooks/api/useGetBags';
import { addDiscFormSchema } from '@/lib/formSchemas';
import { AddDiscFormProps } from '@/types/types';
import { useRef, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { ImageCropper } from '@/components/ImageCropper';

export function AddDiscForm({ searchedDisc, setOpen }: AddDiscFormProps) {
  const { addDisc } = useAddDisc();
  const queryClient = useQueryClient();
  const { data: bags } = useGetBags();
  const [imageToggle, setImageToggle] = useState('colour');
  const [showCropper, setShowCropper] = useState(false);
  const [originalImageSrc, setOriginalImageSrc] = useState<string>('');
  const [croppedPreview, setCroppedPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Setting up initial form state values
  const form = useForm<z.infer<typeof addDiscFormSchema>>({
    resolver: zodResolver(addDiscFormSchema),
    defaultValues: {
      brand: searchedDisc?.brand || '',
      name: searchedDisc?.name || '',
      category: searchedDisc?.category || '',
      plastic: '',
      colour: '#ffffff',
      weight: 175,
      speed: Number(searchedDisc?.speed) || 0,
      glide: Number(searchedDisc?.glide) || 0,
      turn: Number(searchedDisc?.turn) || 0,
      fade: Number(searchedDisc?.fade) || 0,
      bagID: '',
      image: undefined,
    },
  });

  // React-Query mutation hook to add disc
  const { mutate, isPending } = useMutation({
    mutationFn: addDisc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discs'] });
      queryClient.invalidateQueries({ queryKey: ['bag'] });
      setOpen(false);
    },
  });

  // Function to handle image toggle
  function handleImageToggle(value: 'colour' | 'image') {
    setImageToggle(value);
    if (value === 'colour') {
      form.setValue('image', undefined);
      setOriginalImageSrc('');
      setCroppedPreview('');
      setShowCropper(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  // Handle file selection and show cropper
  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string;
        setOriginalImageSrc(imageSrc);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle crop completion
  function handleCropComplete(croppedImageUrl: string, croppedImageFile: File) {
    form.setValue('image', croppedImageFile);
    setCroppedPreview(croppedImageUrl);
    setShowCropper(false);
  }

  // Handle crop cancellation
  function handleCropCancel() {
    setShowCropper(false);
    setOriginalImageSrc('');
    setCroppedPreview('');
    form.setValue('image', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  // Function to handle form submission
  function onSubmit(values: z.infer<typeof addDiscFormSchema>) {
    mutate({ ...values, image: values.image || undefined });
  }

  // If showing cropper, render only the cropper
  if (showCropper) {
    return (
      <ImageCropper
        imageSrc={originalImageSrc}
        onCropComplete={handleCropComplete}
        onCancel={handleCropCancel}
      />
    );
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
            defaultValue={searchedDisc?.brand ? searchedDisc.brand : ''}
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
            defaultValue={175}
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
            defaultValue={imageToggle}
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
            <div className='flex flex-col gap-2'>
              <Label>Image</Label>
              <Input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                capture='environment'
                onChange={handleFileSelect}
              />
              {croppedPreview && (
                <div className='flex items-center gap-2'>
                  <img
                    src={croppedPreview}
                    alt='Cropped preview'
                    className='h-16 w-16 rounded-full border object-cover'
                  />
                  <span className='text-sm text-green-600'>
                    ✓ Image Preview
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
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
          <Button
            aria-label='confirm add disc button'
            className='w-full'
            type='submit'
            disabled={isPending}
          >
            Add Disc
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
