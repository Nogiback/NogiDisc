import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import { AddDiscFormData } from '@/types/types';
import useAxiosInstance from '@/hooks/api/useAxiosInstance';

export default function useAddDisc() {
  const api = useAxiosInstance();
  const UPLOAD_PRESET: string = import.meta.env.VITE_UPLOAD_PRESET;
  const CLOUD_NAME: string = import.meta.env.VITE_CLOUD_NAME;

  async function addDisc(formData: AddDiscFormData) {
    const isValid = handleInputErrors(formData);
    if (!isValid) return;

    try {
      let imageURL;

      // If an image is provided, upload it first
      if (formData.image && formData.image.type.includes('image')) {
        const image = new FormData();
        image.append('file', formData.image);
        image.append('cloud_name', CLOUD_NAME);
        image.append('upload_preset', UPLOAD_PRESET);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          image,
        );
        imageURL = res.data.url;
      } else {
        imageURL = '';
      }

      const formDataWithImage = {
        ...formData,
        image: imageURL,
      };

      const res = await api.post('/api/inventory/create', formDataWithImage);

      if (res.status === 200) {
        toast.success('Disc successfully added to inventory');
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        toast.error(err.response.data.message);
        return;
      }
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    }
  }

  return { addDisc };
}

function handleInputErrors({
  brand,
  name,
  weight,
  category,
  plastic,
  colour,
}: AddDiscFormData) {
  if (!brand || !name || !weight || !category || !plastic || !colour) {
    toast.error('Please fill out all fields.');
    return false;
  } else {
    return true;
  }
}
