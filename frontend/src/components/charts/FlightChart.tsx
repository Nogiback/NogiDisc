import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// const data = [
//   {
//     name: 'Start',
//     uv: 0,
//     pv: 0,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const disc1 = [
  { name: 'Start', x: 0, y: 0 },
  { name: 'Initial Phase', x: 2, y: 50 },
  { name: 'Middle Phase', x: 8, y: 100 },
  { name: 'Turn Phase', x: 14, y: 150 },
  { name: 'Fade Phase', x: -5, y: 200 },
];

const labelStyle = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#333',
};

export function FlightChart() {
  return (
    <LineChart
      layout='vertical'
      width={500}
      height={750}
      data={disc1}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='x' type='number' domain={[-50, 50]} allowDataOverflow />
      <YAxis dataKey='y' type='number' reversed />
      <Tooltip labelStyle={labelStyle} />
      <Legend />
      <Line type='natural' dataKey='x' stroke='#8884d8' strokeWidth={2} />
    </LineChart>
  );
}
