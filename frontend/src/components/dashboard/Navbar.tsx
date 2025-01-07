import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, LoaderPinwheel } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/useAuth';

export function NavBar() {
  const { authUser } = useAuth();

  return (
    <Card className='fixed mt-5 flex w-screen items-center justify-between gap-6 rounded-2xl border-0 bg-card px-4 py-3'>
      <LoaderPinwheel />

      <ul className='hidden items-center gap-10 text-card-foreground md:flex'>
        <li className='font-medium text-primary'>
          <a href='#home'>Home</a>
        </li>
        <li>
          <a href='#features'>Features</a>
        </li>
        <li>
          <a href='#pricing'>Pricing</a>
        </li>
        <li>
          <a href='#faqs'>FAQs</a>
        </li>
      </ul>

      <div className='flex items-center gap-4'>
        <DarkModeToggle />
        <Avatar className='h-10 w-10'>
          <AvatarImage
            src={authUser?.profilePic}
            referrerPolicy='no-referrer'
          />
          <AvatarFallback>{`${authUser?.firstName[0]}${authUser?.lastName[0]}`}</AvatarFallback>
        </Avatar>

        <div className='mr-2 flex items-center gap-2 md:hidden'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <Menu className='h-5 w-5 rotate-0 scale-100' />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
              <DropdownMenuItem>
                <a href='#home'>Home</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href='#features'>Features</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href='#pricing'>Pricing</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href='#faqs'>FAQs</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant='secondary' className='w-full text-sm'>
                  Login
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button className='w-full text-sm'>Get Started</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
