import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import 'react-image-crop/dist/ReactCrop.css';
import { ImageCropperProps } from '@/types/types';

export function ImageCropper({
  imageSrc,
  onCropComplete,
  onCancel,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;

      // Set initial crop to be a square in the center
      const size = Math.min(width, height) * 0.8;
      const x = (width - size) / 2;
      const y = (height - size) / 2;

      setCrop({
        unit: 'px',
        width: size,
        height: size,
        x: x,
        y: y,
      });
    },
    [],
  );

  const getCroppedImg = useCallback(() => {
    if (!completedCrop || !imgRef.current || !canvasRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Set canvas size to match the crop
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    // Draw the cropped image
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height,
    );

    // Convert canvas to blob and create URL
    canvas.toBlob(
      (blob) => {
        if (blob) {
          // Create a File object from the blob
          const fileName = `cropped-image-${Date.now()}.jpg`;
          const croppedImageFile = new File([blob], fileName, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });

          const croppedImageUrl = URL.createObjectURL(blob);

          onCropComplete(croppedImageUrl, croppedImageFile);
        }
      },
      'image/jpeg',
      0.9,
    );
  }, [completedCrop, onCropComplete]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-center'>
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={1}
          circularCrop={true}
        >
          <img
            ref={imgRef}
            alt='Crop me'
            src={imageSrc}
            style={{ maxHeight: '400px', maxWidth: '100%' }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      </div>

      {/* Hidden canvas for cropping */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <DialogFooter className='flex gap-2'>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={getCroppedImg}>Crop Image</Button>
      </DialogFooter>
    </div>
  );
}
