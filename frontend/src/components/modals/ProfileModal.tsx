import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/auth/useAuth';
import { ProfileForm } from '@/components/forms/ProfileForm';

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
        <ProfileForm />
      </div>
    </DialogContent>
  );
}
