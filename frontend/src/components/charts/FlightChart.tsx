import { Disc } from '@prisma/client';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from 'recharts';
import { FlightData } from '@/types/types';
import { FlightChartProps } from '@/types/types';

// const labelStyle = {
//   fontSize: '12px',
//   fontWeight: 'bold',
//   color: '#333',
// };

export function FlightChart({ discs }: FlightChartProps) {
  const [discsFlightData, setDiscsFlightData] = useState<FlightData[]>([]);

  useEffect(() => {
    const flightData: FlightData[] = discs.map((disc) => {
      return {
        name: `${disc.name}`,
        colour: disc.colour ? disc.colour : '#FFFFFF',
        data: generateFlightData(disc),
      };
    });
    setDiscsFlightData(flightData);
  }, [discs]);

  function generateFlightData(disc: Disc): { x: number; y: number }[] {
    const SPEED_GLIDE_COEFFICIENT = 0.6;
    const MIN_DISTANCE = 200;
    const MAX_DISTANCE = 500;
    const flightData = [];

    // Hardcoded points for the flight path (distance parameter, fade influence, turn influence)
    const POINT_PARAMS = [
      { dp: 0, fI: 0, tI: 0 },
      { dp: 0.3, fI: 0, tI: 0 },
      { dp: 0.5, fI: 0, tI: 0 },
      { dp: 0.7, fI: 0, tI: -7 },
      { dp: 0.81, fI: -2, tI: -4 },
      { dp: 0.91, fI: -3, tI: -3 },
      { dp: 1, fI: -7.5, tI: -2 },
    ];

    // Calculate the distance factor based on speed and glide
    const speedFactor = (disc.speed - 1) / (14.5 - 1);
    const glideFactor = (disc.glide - 1) / (7 - 1);
    const distanceFactor =
      speedFactor * SPEED_GLIDE_COEFFICIENT +
      glideFactor * (1 - SPEED_GLIDE_COEFFICIENT);

    // Calculate the distance based on speed and glide factors
    const totalDistance =
      MIN_DISTANCE + (MAX_DISTANCE - MIN_DISTANCE) * distanceFactor;

    // Calculating the x and y coordinates for the flight path
    let prevX = 0;
    for (const point of POINT_PARAMS) {
      const y = point.dp * totalDistance;

      // Check if disc has a positive turn to correct flight path
      if (disc.turn > 0) {
        point.tI = 0;
        point.fI = point.fI * 1.3;
      }

      const x = prevX + disc.fade * point.fI + disc.turn * point.tI;

      prevX = x;
      flightData.push({ x, y });
    }

    return flightData;
  }

  const renderCustomLabel = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: any,
    discName: string,
    discColour: string,
  ) => {
    const { x, y, index } = props;

    // Only render label on the last point
    if (index === 6) {
      return (
        <text
          x={x + 6}
          y={y - 6}
          fill={discColour}
          fontSize='15'
          textAnchor='start'
          dominantBaseline='middle'
        >
          {discName}
        </text>
      );
    }
    return null;
  };

  // If no discs are provided, return null to avoid rendering the chart
  if (!discs || discs.length === 0) {
    return null;
  }

  return (
    <div className='w-full flex-col items-center justify-center text-center'>
      <h2 className='text-2xl font-bold'>Flight Chart</h2>
      <LineChart
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
          dataKey='x'
          type='number'
          domain={[-80, 80]}
          allowDataOverflow
          reversed={false}
          hide
        />
        <YAxis
          dataKey='y'
          type='number'
          domain={[0, 500]}
          tickCount={11}
          label={{
            value: 'Distance (ft)',
            angle: -90,
            position: 'insideLeft',
            offset: 10,
          }}
          width={70}
          reversed
          allowDataOverflow
        />

        {discsFlightData.map((s) => (
          <Line
            type='basis'
            dataKey='x'
            data={s.data}
            name={s.name}
            key={s.name}
            stroke={s.colour}
            strokeWidth={5}
            dot={false}
          >
            <LabelList
              content={(props) => renderCustomLabel(props, s.name, s.colour)}
            />
          </Line>
        ))}
      </LineChart>
    </div>
  );
}
