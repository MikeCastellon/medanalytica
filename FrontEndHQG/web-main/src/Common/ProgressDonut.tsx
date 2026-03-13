import { PieChart, Pie, Cell, Sector } from "recharts";

type ProgressDonutProps = {
  progress: number
  primaryColor?: string
  radius?: number
}

export function ProgressDonut({ progress, primaryColor = "red", radius = 110 }: ProgressDonutProps) {
  const data = [
    { value: 0, color: 'lightgrey' },
    { value: progress, color: primaryColor },
    { value: 100 - progress, color: 'lightgrey' },
  ];

  return (
    <PieChart width={radius} height={radius}>
      <Pie
        dataKey="value"
        activeIndex={1}
        activeShape={({ cx, cy, payload, innerRadius, outerRadius, startAngle, endAngle, fill }) => {
          return (<g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"charcoal"} fontFamily="Arial, Helvetica, sans-serif">{payload.value.toFixed()}%</text>
            <Sector
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              fill={fill}
            />
          </g>)
        }}
        startAngle={360 + 90}
        endAngle={90}
        data={data}
        cx={(radius / 2) - 5}
        cy={(radius / 2) - 5}
        innerRadius={45}
        outerRadius={(radius / 2) - 5}
      >
        {
          data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))
        }
      </Pie>
    </PieChart>
  );
}
