import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/hooks/auth/useAuth';

export default function ProfileModal() {
  const { authUser: user } = useAuth();

  return (
    <DialogContent className='w-full'>
      <DialogHeader>
        <DialogTitle className='text-2xl font-bold'>Profile</DialogTitle>
        <DialogDescription className='hidden'>
          User Profile Card
        </DialogDescription>
      </DialogHeader>
      <div className='flex flex-col items-center justify-center gap-4'>
        <Avatar className='h-24 w-24 rounded-full'>
          <AvatarImage
            src={user?.profilePic}
            alt={`${user?.firstName} ${user?.lastName}`}
            referrerPolicy='no-referrer'
          />
          <AvatarFallback className='rounded-lg'>{`${user?.firstName[0]}${user?.lastName[0]}`}</AvatarFallback>
        </Avatar>
        <div className='flex gap-1 text-lg font-bold'>
          <span>{user?.firstName}</span>
          <span>{user?.lastName}</span>
        </div>
        <p>{user?.email}</p>
      </div>
      <DialogFooter>
        <Button type='submit'>Close</Button>
      </DialogFooter>
    </DialogContent>
  );
}
