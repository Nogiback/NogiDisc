import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Disc } from '@/types/types';

type CategoryChartProps = {
  discs: Disc[];
};

export function CategoryChart({ discs }: CategoryChartProps) {
  const chartConfig = {
    discs: {
      label: 'Discs',
      color: 'hsl(var(--foreground))',
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      category: 'Putter',
      discs: discs.filter((disc) => disc.category === 'Putter').length,
    },
    {
      category: 'Approach',
      discs: discs.filter((disc) => disc.category === 'Approach').length,
    },
    {
      category: 'Midrange',
      discs: discs.filter((disc) => disc.category === 'Midrange').length,
    },
    {
      category: 'Control Driver',
      discs: discs.filter((disc) => disc.category === 'Control Driver').length,
    },
    {
      category: 'Hybrid Driver',
      discs: discs.filter((disc) => disc.category === 'Hybrid Driver').length,
    },
    {
      category: 'Distance Driver',
      discs: discs.filter((disc) => disc.category === 'Distance Driver').length,
    },
  ];

  return (
    <Card>
      <CardHeader className='items-center pb-4'>
        <CardTitle>Categories</CardTitle>
        <CardDescription className='hidden'>
          Showing the total number of discs for each category in your bag
        </CardDescription>
      </CardHeader>
      <CardContent className=''>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px] min-w-[360px]'
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey='category' />
            <PolarGrid />
            <Radar
              dataKey='discs'
              fill='var(--color-discs)'
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
