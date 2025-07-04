import { Cell, Pie, PieChart } from 'recharts';
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
import { Disc } from '@prisma/client';

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
    fill: generateColor(brand),
  }));

  function generateColor(brand: string) {
    let hash = 0;
    for (let i = 0; i < brand.length; i++) {
      hash = brand.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 50%)`;
    return color;
  }

  // Custom label function to show brand name
  function renderCustomLabel({ brand }: { brand: string }) {
    return brand;
  }

  return (
    <Card>
      <CardHeader className='items-center pb-4'>
        <CardTitle>Brands</CardTitle>
        <CardDescription className='hidden'>
          Showing the total number of discs for each brand in your bag
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='discs'
              nameKey='brand'
              label={renderCustomLabel}
              fontSize={14}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
