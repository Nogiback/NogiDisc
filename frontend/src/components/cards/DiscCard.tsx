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
import { EditDiscModal } from '@/components/modals/EditDiscModal';
import { getBrandLogo } from '@/lib/getBrandLogo';
import { GlowCapture, Glow } from '@codaworks/react-glow';

export default function DiscCard({ disc }: DiscCardProps) {
  const brandLogo = getBrandLogo(disc.brand);

  return (
    <GlowCapture>
      <Glow color='white'>
        <Card className='relative w-56 glow:border-black glow:bg-primary-foreground dark:glow:border-white'>
          <div className='absolute right-0 top-0 flex gap-0 p-0'>
            <EditDiscModal disc={disc} />
            <DeleteDiscModal discID={disc.id} />
          </div>
          <CardHeader>
            <div className='flex justify-between'>
              <div className=''>
                <CardTitle className='text-lg'>{disc.name}</CardTitle>
                <CardDescription className='text-xs'>{`${disc.plastic}, ${disc.weight}g`}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='flex flex-col items-center justify-center'>
            <div
              className='flex h-28 w-28 items-center justify-center rounded-full'
              style={{ backgroundColor: disc.colour ? disc.colour : 'gray' }}
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
          </CardContent>
          <CardFooter className='flex flex-col items-center justify-center'>
            <span className='text-md font-bold'>
              {disc.speed} / {disc.glide} / {disc.turn} / {disc.fade}
            </span>
          </CardFooter>
        </Card>
      </Glow>
    </GlowCapture>
  );
}
