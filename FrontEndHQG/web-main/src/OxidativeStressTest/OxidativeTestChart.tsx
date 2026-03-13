import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import { ChartDataPoint } from './hooks/useOxidativeTestData';
import { colorMap } from './OxidativeStressTestForm';

export const OxidativeTestChart: React.FC<{
  data: ChartDataPoint[];
  timeProportional: boolean;
  xDomain: [number, number];
  selectedItem?: ChartDataPoint;
  selectedId?: string | number;
  onSelectPoint?: (item: ChartDataPoint) => void;
}> = ({
  data,
  timeProportional,
  xDomain,
  selectedItem,
  selectedId,
  onSelectPoint,
}) => {
  // Set fixed domain for colors (1-5 with some padding)
  const yDomain = [0, 6];

  // Define color mapping for the color values 1-5

  // Get color based on value
  const getColorByValue = (value: keyof typeof colorMap) => {
    return colorMap[value] || '#8884d8'; // Default to purple if not in map
  };

  // Custom tooltip formatter
  const tooltipFormatter = (value: any, name: string, props: any) => {
    if (value === null) return ['No data yet', ''];
    if (name === 'color') return [`Color: ${value}`, ''];
    return [value, ''];
  };

  // Custom label formatter for X axis in time mode
  const timeAxisFormatter = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  // Find data point by index for sequential mode tooltip
  const getItemByIndex = (index: number) => {
    return data.find((d) => d.index === index);
  };

  // Handle click on a data point
  const handlePointClick = (item: ChartDataPoint) => {
    if (onSelectPoint) {
      onSelectPoint(item);
    }
  };

  // Custom dot renderer with selection indicator and color mapping
  const renderDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isDraft = payload.isDraft;
    const colorValue = payload.color;
    const dotColor = getColorByValue(colorValue);

    // Check for selection based on either selectedItem or selectedId
    const isSelected =
      (selectedItem && payload.index === selectedItem.index) ||
      (selectedId != null && payload.id === selectedId);

    return (
      <g
        key={props.key}
        onClick={(e) => {
          e.stopPropagation();
          handlePointClick(payload);
        }}
        style={{ cursor: 'pointer' }}
      >
        {/* Visible circle */}
        <circle
          cx={cx}
          cy={cy}
          r={isDraft ? 8 : 6}
          fill={isDraft ? 'lightgrey' : dotColor}
          stroke="none"
        />

        {/* Selection indicator */}
        {isSelected && (
          <circle
            cx={cx}
            cy={cy}
            r={10}
            fill="none"
            stroke="#FF6B6B"
            strokeWidth={2}
          />
        )}
      </g>
    );
  };

  // Custom tooltip content to display title, date, and color value in that order
  const CustomTooltip = (props: any) => {
    const { active, payload, label } = props;

    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const colorValue = data.color;
      const colorHex = getColorByValue(colorValue);

      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: 'white',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            pointerEvents: 'none', // Ensure tooltip doesn't capture pointer events
          }}
        >
          <p style={{ margin: '0', fontWeight: 'bold' }}>
            {data.title || 'Oxidative Test'}
          </p>
          <p style={{ margin: '0' }}>
            Date:{' '}
            {timeProportional
              ? new Date(data.timestamp).toLocaleDateString()
              : data.date}
          </p>
          <p style={{ margin: '0', display: 'flex', alignItems: 'center' }}>
            Color Value: {colorValue}
            <span
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: colorHex,
                marginLeft: '5px',
                borderRadius: '50%',
              }}
            ></span>
          </p>
        </div>
      );
    }

    return null;
  };

  // Create legend items
  const legendItems = [
    { value: 'Very low free radical activity', color: colorMap[1] },
    { value: 'Low free radical activity', color: colorMap[2] },
    {
      value:
        'Medium free radical activity and may require an increase in antioxidants',
      color: colorMap[3],
    },
    {
      value:
        'High level of free radical activity and a need to increase antioxidants',
      color: colorMap[4],
    },
    {
      value:
        'Very high free radical activity with a need to seriously increase antioxidants',
      color: colorMap[5],
    },
  ];

  // Custom legend renderer
  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className="flex flex-col justify-center mt-8">
        <div className="text-md font-bold mb-2">Legend</div>
        {legendItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '15px',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: item.color,
                borderRadius: '50%',
                marginRight: '5px',
              }}
            ></div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    );
  };

  // Configuration for the tooltip to ensure it doesn't interfere with clicks
  const tooltipConfig = {
    content: <CustomTooltip />,
    cursor: false, // Remove the vertical cursor line which can interfere with clicks
    isAnimationActive: false, // Disable animations that might interfere
    position: { y: -20 }, // Position tooltip slightly above points to avoid overlap
    formatter: tooltipFormatter,
  };

  if (timeProportional) {
    return (
      <>
        <ResponsiveContainer width="100%" height="95%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              type="number"
              domain={xDomain}
              tickFormatter={timeAxisFormatter}
              scale="time"
              tickCount={5}
            />
            <YAxis
              domain={yDomain}
              allowDataOverflow={false}
              label={{ value: 'Color', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip {...tooltipConfig} />
            <Line
              isAnimationActive={false}
              dataKey="color"
              name="Color Level"
              stroke="#8884d8"
              connectNulls={false}
              dot={renderDot}
              activeDot={false} // Disable the active dot to prevent tooltip interaction issues
            />
            <Legend content={renderLegend} />
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  } else {
    return (
      <>
        <ResponsiveContainer width="100%" height="95%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="index"
              tickFormatter={(index) => {
                const item = getItemByIndex(index);
                return item ? item.date : '';
              }}
              ticks={data.map((d) => d.index)}
            />
            <YAxis
              domain={yDomain}
              allowDataOverflow={false}
              label={{ value: 'Color', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip {...tooltipConfig} />
            <Line
              isAnimationActive={false}
              dataKey="color"
              name="Color Level"
              stroke="#8884d8"
              connectNulls={false}
              dot={renderDot}
              activeDot={false} // Disable the active dot to prevent tooltip interaction issues
            />
            <Legend content={renderLegend} />
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  }
};
