import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LoaderPinwheel } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/useAuth';
import { Link } from 'react-router-dom';

export function NavBar() {
  const { authUser } = useAuth();

  return (
    <Card className='fixed mt-2 flex w-screen items-center justify-between gap-6 rounded-2xl border-0 bg-card px-4 py-3'>
      <Link to='/' className='flex gap-2 text-primary hover:text-primary'>
        <LoaderPinwheel />
        <span className='text-xl font-bold'>NogiDisc</span>
      </Link>

      <div className='flex items-center gap-4'>
        <DarkModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='hover:cursor-pointer'>
            <Avatar className='h-10 w-10'>
              <AvatarImage
                src={authUser?.profilePic}
                referrerPolicy='no-referrer'
              />
              <AvatarFallback>{`${authUser?.firstName[0]}${authUser?.lastName[0]}`}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>
              <Link to='#profile'>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to='#bags'>Bags</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to='#discs'>Discs</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant='default' className='w-full text-sm'>
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
