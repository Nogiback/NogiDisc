import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import { EditDiscFormData } from '@/types/types';
import useAxiosInstance from '@/hooks/api/useAxiosInstance';

export default function useEditDisc() {
  const api = useAxiosInstance();
  const UPLOAD_PRESET: string = import.meta.env.VITE_UPLOAD_PRESET;
  const CLOUD_NAME: string = import.meta.env.VITE_CLOUD_NAME;

  async function editDisc(formData: EditDiscFormData) {
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
      } else if (formData.previousImage) {
        imageURL = formData.previousImage;
      } else {
        imageURL = '';
      }

      const formDataWithImage = {
        ...formData,
        image: imageURL,
      };

      const res = await api.patch(
        `/api/inventory/edit/${formData.id}`,
        formDataWithImage,
      );
      if (res.status === 200) {
        toast.success('Disc successfully updated');
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

  return { editDisc };
}

function handleInputErrors({
  brand,
  name,
  weight,
  category,
  plastic,
  colour,
}: EditDiscFormData) {
  if (!brand || !name || !weight || !category || !plastic || !colour) {
    toast.error('Please fill out all fields.');
    return false;
  } else {
    return true;
  }
}
