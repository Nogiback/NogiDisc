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

type BrandChartProps = {
  discs: Disc[];
};

export function BrandsChart({ discs }: BrandChartProps) {
  const chartConfig = {
    discs: {
      label: 'Discs',
      color: 'hsl(var(--foreground))',
    },
  } satisfies ChartConfig;

  // Create a count of discs per brand
  const brandCount = discs.reduce(
    (acc, disc) => {
      acc[disc.brand] = (acc[disc.brand] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Convert to chart-friendly format
  const chartData = Object.keys(brandCount).map((brand) => ({
    brand,
    discs: brandCount[brand],
  }));

  return (
    <Card>
      <CardHeader className='items-center pb-4'>
        <CardTitle>Brands</CardTitle>
        <CardDescription>
          Showing the total number of discs for each brand in your bag
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey='brand' />
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
