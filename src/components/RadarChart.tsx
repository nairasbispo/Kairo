import React from 'react';

interface RadarChartProps {
  data: {
    label: string;
    value: number; // 0 to 100
  }[];
  size?: number;
  showLabels?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  size = 280,
  showLabels = true
}) => {
  const center = size / 2;
  const radius = center * 0.65;
  const numSides = data.length;

  const getCoordinates = (index: number, val: number) => {
    const angle = (Math.PI * 2 / numSides) * index - Math.PI / 2;
    const r = (val / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Generate web background grid polygons (at 25%, 50%, 75%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const gridPolygons = gridLevels.map((level) => {
    const points = data.map((_, i) => {
      const angle = (Math.PI * 2 / numSides) * i - Math.PI / 2;
      const r = level * radius;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    });
    return points.join(' ');
  });

  // Calculate data polygon
  const dataPoints = data.map((d, i) => {
    const coords = getCoordinates(i, d.value);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <svg width={size} height={size} className="overflow-visible">
        {/* Web Grid Levels */}
        {gridPolygons.map((points, idx) => (
          <polygon
            key={idx}
            points={points}
            fill="none"
            stroke="#dcc1ba"
            strokeWidth={idx === 3 ? "1.5" : "1"}
            strokeDasharray={idx < 3 ? "3 3" : undefined}
            opacity={0.6 + idx * 0.1}
          />
        ))}

        {/* Axis lines from center */}
        {data.map((_, i) => {
          const angle = (Math.PI * 2 / numSides) * i - Math.PI / 2;
          const endX = center + radius * Math.cos(angle);
          const endY = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={endX}
              y2={endY}
              stroke="#dcc1ba"
              strokeWidth="1"
            />
          );
        })}

        {/* Data Filled Polygon */}
        <polygon
          points={dataPoints}
          fill="rgba(154, 64, 41, 0.22)"
          stroke="#9a4029"
          strokeWidth="2.5"
          className="transition-all duration-500 ease-out"
        />

        {/* Data Vertices */}
        {data.map((d, i) => {
          const coords = getCoordinates(i, d.value);
          return (
            <circle
              key={i}
              cx={coords.x}
              cy={coords.y}
              r="4.5"
              fill="#fff8f5"
              stroke="#9a4029"
              strokeWidth="2.5"
              className="transition-all duration-500"
            />
          );
        })}

        {/* Axis Labels */}
        {showLabels && data.map((d, i) => {
          const angle = (Math.PI * 2 / numSides) * i - Math.PI / 2;
          const labelRadius = radius + 24;
          const lx = center + labelRadius * Math.cos(angle);
          const ly = center + labelRadius * Math.sin(angle);

          let textAnchor = "middle";
          if (Math.abs(Math.cos(angle)) > 0.3) {
            textAnchor = Math.cos(angle) > 0 ? "start" : "end";
          }

          return (
            <g key={i}>
              <text
                x={lx}
                y={ly}
                textAnchor={textAnchor}
                dominantBaseline="central"
                className="fill-[#56423d] text-[11px] font-semibold tracking-wider uppercase font-sans"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
