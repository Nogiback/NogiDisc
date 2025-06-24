import { Disc } from '@prisma/client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

// const series = [
//   {
//     name: 'Disc 1',
//     colour: '#8884d8',
//     data: [
//       { x: 0, y: 0 },
//       { x: 0, y: 50 },
//       { x: 2, y: 100 },
//       { x: 6, y: 150 },
//       { x: 0, y: 200 },
//     ],
//   },
//   {
//     name: 'Disc 2',
//     colour: '#82ca9d',
//     data: [
//       { x: 0, y: 0 },
//       { x: 0, y: 75 },
//       { x: 3, y: 150 },
//       { x: 8, y: 225 },
//       { x: 1, y: 300 },
//     ],
//   },
//   {
//     name: 'Disc 3',
//     colour: '#ffc658',
//     data: [
//       { x: 0, y: 0 },
//       { x: 0, y: 100 },
//       { x: 3, y: 200 },
//       { x: 9, y: 300 },
//       { x: -6, y: 400 },
//     ],
//   },
// ];

// const labelStyle = {
//   fontSize: '12px',
//   fontWeight: 'bold',
//   color: '#333',
// };

type FlightChartProps = {
  discs: Disc[];
};

type FlightData = {
  name: string;
  colour: string;
  data: { x: number; y: number }[];
};

export function FlightChart({ discs }: FlightChartProps) {
  const [discsFlightData, setDiscsFlightData] = useState<FlightData[]>([]);

  useEffect(() => {
    const flightData: FlightData[] = discs.map((disc) => {
      return {
        name: `${disc.brand} ${disc.name}`,
        colour: disc.colour ? disc.colour : '#FFFFFF',
        data: [
          { x: 0, y: 0 }, // Start point
          { x: disc.turn, y: disc.glide * 10 }, // Glide
          { x: disc.speed, y: disc.glide * 20 }, // Speed
          { x: disc.turn * 2, y: disc.glide * 30 }, // Further flight
          { x: -disc.turn, y: disc.glide * 40 }, // Finish point
        ],
      };
    });
    setDiscsFlightData(flightData);
  }, [discs]);

  if (!discs || discs.length === 0) {
    return null;
  }

  return (
    <LineChart
      width={500}
      height={750}
      layout='vertical'
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='x' type='number' domain={[-50, 50]} allowDataOverflow />
      <YAxis
        dataKey='y'
        type='number'
        domain={[0, 300]}
        reversed
        allowDataOverflow
      />

      {discsFlightData.map((s) => (
        <Line
          type='natural'
          dataKey='x'
          data={s.data}
          name={s.name}
          key={s.name}
          stroke={s.colour}
          strokeWidth={5}
          dot={false}
        />
      ))}
    </LineChart>
  );
}
