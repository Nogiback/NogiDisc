import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FlightChartProps, StabilityData } from '@/types/types';
import { useEffect, useState } from 'react';

// Custom dot component that can render images
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  const size = 20;
  const sanitizedName = payload.name
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '');

  if (payload.image) {
    return (
      <g>
        <defs>
          <clipPath id={`clip-${sanitizedName}`}>
            <circle cx={cx} cy={cy} r={size} />
          </clipPath>
        </defs>
        <image
          href={payload.image}
          x={cx - size}
          y={cy - size}
          width={size * 2}
          height={size * 2}
          clipPath={`url(#clip-${sanitizedName})`}
          preserveAspectRatio='xMidYMid meet'
        />
      </g>
    );
  }

  // Fallback to color if no image
  return (
    <circle
      cx={cx}
      cy={cy}
      r={size}
      fill={payload.colour}
      stroke={payload.colour}
      strokeWidth={2}
    />
  );
};

export function StabilityChart({ discs }: FlightChartProps) {
  const [discsStabilityData, setDiscsStabilityData] = useState<StabilityData[]>(
    [],
  );

  useEffect(() => {
    const stabilityData: StabilityData[] = discs.map((disc) => {
      return {
        name: `${disc.name}`,
        colour: disc.colour ? disc.colour : '#FFFFFF',
        image: disc.image ? disc.image : null,
        speed: disc.speed,
        stability: disc.turn + disc.fade,
      };
    });
    setDiscsStabilityData(stabilityData);
  }, [discs]);

  // If no discs are provided, return null to avoid rendering the chart
  if (!discs || discs.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className='items-center pb-4'>
        <CardTitle>Stability Chart</CardTitle>
        <CardDescription className='hidden'>
          Showing the stability and speed of each disc in your bag on a graph
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScatterChart
          width={500}
          height={750}
          layout='vertical'
          margin={{
            top: 20,
            right: 50,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            type='number'
            dataKey='stability'
            name='stability'
            domain={[-4, 6]}
            label={{
              value: 'Turn + Fade (Stability)',
              position: 'insideBottom',
              offset: -10,
            }}
            tickCount={10}
            reversed
          />
          <YAxis
            type='number'
            dataKey='speed'
            name='speed'
            reversed
            domain={[0, 15]}
            label={{
              value: 'Speed',
              angle: -90,
              position: 'insideLeft',
            }}
            tickCount={16}
          />
          <Scatter
            name='Stability'
            data={discsStabilityData}
            shape={<CustomDot />}
          >
            <LabelList
              dataKey='name'
              position='top'
              offset={16}
              content={(props) => {
                const { x, y, value, index } = props;
                const discData =
                  typeof index === 'number' ? discsStabilityData[index] : null;
                const xPos = typeof x === 'number' ? x + 4 : 0;
                const yPos = typeof y === 'number' ? y - 22 : 0;
                return (
                  <text
                    x={xPos}
                    y={yPos}
                    textAnchor='middle'
                    dominantBaseline='middle'
                    fontSize={16}
                    fill={discData?.colour || '#000000'}
                  >
                    {value}
                  </text>
                );
              }}
            />
          </Scatter>
        </ScatterChart>
      </CardContent>
    </Card>
  );
}
