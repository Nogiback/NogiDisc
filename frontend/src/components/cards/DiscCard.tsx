// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { DiscCardProps } from '@/types/types';
// import { DeleteDiscModal } from '@/components/modals/DeleteDiscModal';
// import { getBrandLogo } from '@/lib/getBrandLogo';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { useState } from 'react';
// import { EditDiscForm } from '@/components/forms/EditDiscForm';

// export default function DiscCard({ disc }: DiscCardProps) {
//   const [open, setOpen] = useState(false);
//   const brandLogo = getBrandLogo(disc.brand);

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <div className='cursor-pointer'>
//           <Card className='group relative w-56 hover:border-black dark:hover:border-white'>
//             <div className='absolute right-0 top-0 flex gap-0 p-0'>
//               <DeleteDiscModal discID={disc.id} />
//             </div>
//             <CardHeader>
//               <div className='flex justify-between'>
//                 <div>
//                   <CardTitle className='text-lg'>{disc.name}</CardTitle>
//                   <CardDescription className='text-xs'>{`${disc.plastic}, ${disc.weight}g`}</CardDescription>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent className='flex flex-col items-center justify-center'>
//               {!disc.image && (
//                 <div
//                   className='flex h-28 w-28 items-center justify-center rounded-full group-hover:animate-[spin_0.5s_linear_infinite]'
//                   style={{
//                     backgroundColor: disc.colour ? disc.colour : 'gray',
//                   }}
//                 >
//                   {brandLogo && (
//                     <img
//                       alt={`${brandLogo} brand logo`}
//                       className='w-12 opacity-50'
//                       src={brandLogo}
//                     ></img>
//                   )}
//                   {!brandLogo && (
//                     <p
//                       aria-label={`${disc.brand} brand logo`}
//                       className='bg-inherit bg-clip-text text-center font-bold text-transparent opacity-50'
//                       style={{ filter: 'invert(1) grayscale(1) contrast(100)' }}
//                     >
//                       {disc.brand}
//                     </p>
//                   )}
//                 </div>
//               )}
//               {disc.image && (
//                 <img
//                   alt={`${disc.name} disc image`}
//                   className='h-28 w-28 rounded-full object-cover group-hover:animate-[spin_0.5s_linear_infinite]'
//                   src={disc.image}
//                 ></img>
//               )}
//             </CardContent>
//             <CardFooter className='flex flex-col items-center justify-center'>
//               <span className='text-md font-bold'>
//                 {disc.speed} / {disc.glide} / {disc.turn} / {disc.fade}
//               </span>
//             </CardFooter>
//           </Card>
//         </div>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit Disc</DialogTitle>
//           <DialogDescription>Update the disc details below</DialogDescription>
//         </DialogHeader>
//         <EditDiscForm disc={disc} setOpen={setOpen} />
//       </DialogContent>
//     </Dialog>
//   );
// }
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DiscCardProps } from '@/types/types';
import { DeleteDiscModal } from '@/components/modals/DeleteDiscModal';
import { getBrandLogo } from '@/lib/getBrandLogo';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { EditDiscForm } from '@/components/forms/EditDiscForm';

export default function DiscCard({ disc }: DiscCardProps) {
  const [open, setOpen] = useState(false);
  const brandLogo = getBrandLogo(disc.brand);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='cursor-pointer'>
          <Card className='group relative w-56 hover:border-black dark:hover:border-white'>
            <div
              className='absolute right-0 top-0 z-10 flex gap-0 p-0'
              onClick={(e) => e.stopPropagation()}
            >
              <DeleteDiscModal discID={disc.id} />
            </div>
            <CardHeader>
              <div className='flex justify-between'>
                <div>
                  <CardTitle className='text-lg'>{disc.name}</CardTitle>
                  <CardDescription className='text-xs'>{`${disc.plastic}, ${disc.weight}g`}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className='flex flex-col items-center justify-center'>
              {!disc.image && (
                <div
                  className='flex h-28 w-28 items-center justify-center rounded-full group-hover:animate-[spin_0.5s_linear_infinite]'
                  style={{
                    backgroundColor: disc.colour ? disc.colour : 'gray',
                  }}
                >
                  {brandLogo && (
                    <img
                      alt={`${brandLogo} brand logo`}
                      className='w-12 opacity-50'
                      src={brandLogo}
                    ></img>
                  )}
                  {!brandLogo && (
                    <p
                      aria-label={`${disc.brand} brand logo`}
                      className='bg-inherit bg-clip-text text-center font-bold text-transparent opacity-50'
                      style={{ filter: 'invert(1) grayscale(1) contrast(100)' }}
                    >
                      {disc.brand}
                    </p>
                  )}
                </div>
              )}
              {disc.image && (
                <img
                  alt={`${disc.name} disc image`}
                  className='h-28 w-28 rounded-full object-cover group-hover:animate-[spin_0.5s_linear_infinite]'
                  src={disc.image}
                ></img>
              )}
            </CardContent>
            <CardFooter className='flex flex-col items-center justify-center'>
              <span className='text-md font-bold'>
                {disc.speed} / {disc.glide} / {disc.turn} / {disc.fade}
              </span>
            </CardFooter>
          </Card>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Disc</DialogTitle>
          <DialogDescription>Update the disc details below</DialogDescription>
        </DialogHeader>
        <EditDiscForm disc={disc} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
