import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartDataPoint } from './hooks/ChartWithDraft';
import { useEffect } from 'react';

// Chart component
export const AdrenalTestChart: React.FC<{
  data: ChartDataPoint[];
  timeProportional: boolean;
  xDomain: [number, number];
  selectedItem?: ChartDataPoint;
  selectedId?: string | number; // Added selectedId prop
  onSelectPoint?: (item: ChartDataPoint) => void;
}> = ({
  data,
  timeProportional,
  xDomain,
  selectedItem,
  selectedId,
  onSelectPoint,
}) => {
  // Set fixed domain for drops (1-27 with some padding)
  const yDomain = [0, 30]; // 0 to 30 drops

  // Custom tooltip formatter
  const tooltipFormatter = (value: any, name: string, props: any) => {
    if (value === null) return ['No data yet', ''];
    if (name === 'drops') return [`${value} drops`, ''];
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

  // Simple dot renderer with selection indicator
  const renderDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isDraft = payload.isDraft;

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
          fill={isDraft ? 'lightgrey' : '#8884d8'}
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

  // Custom tooltip content to display title, date, and drops in that order
  const CustomTooltip = (props: any) => {
    const { active, payload, label } = props;

    if (active && payload && payload.length) {
      const data = payload[0].payload;

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
            {data.title || 'Adrenal Test'}
          </p>
          <p style={{ margin: '0' }}>
            Date:{' '}
            {timeProportional
              ? new Date(data.timestamp).toLocaleDateString()
              : data.date}
          </p>
          <p style={{ margin: '0' }}>Drops: {data.drops}</p>
        </div>
      );
    }

    return null;
  };

  // Configuration for the tooltip to ensure it doesn't interfere with clicks
  const tooltipConfig = {
    content: <CustomTooltip />,
    cursor: false, // Remove the vertical cursor line which can interfere with clicks
    isAnimationActive: false, // Disable animations that might interfere
    position: { y: -20 }, // Position tooltip slightly above points to avoid overlap
  };

  if (timeProportional) {
    return (
      <>
        <ResponsiveContainer width="100%" height="100%">
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
              label={{ value: 'Drops', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip {...tooltipConfig} />
            <Line
              isAnimationActive={false}
              dataKey="drops"
              name="Adrenal Drops"
              stroke="#8884d8"
              connectNulls={false}
              dot={renderDot}
              activeDot={false} // Disable the active dot to prevent tooltip interaction issues
            />
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  } else {
    return (
      <>
        <ResponsiveContainer width="100%" height="100%">
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
              label={{ value: 'Drops', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip {...tooltipConfig} />
            <Line
              isAnimationActive={false}
              dataKey="drops"
              stroke="#8884d8"
              connectNulls={false}
              dot={renderDot}
              activeDot={false} // Disable the active dot to prevent tooltip interaction issues
            />
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  }
};
