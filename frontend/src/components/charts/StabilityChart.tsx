import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Cell,
} from 'recharts';
import { FlightChartProps, StabilityData } from '@/types/types';
import { useEffect, useState } from 'react';

export function StabilityChart({ discs }: FlightChartProps) {
  const [discsStabilityData, setDiscsStabilityData] = useState<StabilityData[]>(
    [],
  );

  useEffect(() => {
    const stabilityData: StabilityData[] = discs.map((disc) => {
      return {
        name: `${disc.name}`,
        colour: disc.colour ? disc.colour : '#FFFFFF',
        speed: disc.speed,
        stability: disc.turn + disc.fade,
      };
    });
    setDiscsStabilityData(stabilityData);
  }, [discs]);

  return (
    <div className='w-full flex-col items-center justify-center text-center'>
      <h2 className='text-2xl font-bold'>Stability Chart</h2>
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
          domain={[-7, 7]}
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
        <Scatter name='Stability' data={discsStabilityData}>
          {discsStabilityData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.colour}
              stroke={entry.colour}
              strokeWidth={12}
            />
          ))}
          <LabelList
            dataKey='name'
            position='top'
            offset={12}
            strokeWidth={0.15}
          />
        </Scatter>
      </ScatterChart>
    </div>
  );
}
