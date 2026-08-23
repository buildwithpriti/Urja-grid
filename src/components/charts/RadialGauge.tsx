import { useEffect, useState } from 'react';

interface RadialGaugeProps {
  value: number;
  max?: number;
  label: string;
  unit?: string;
  size?: number;
  thresholds?: { warning: number; critical: number };
  color?: string;
}

export function RadialGauge({
  value,
  max = 100,
  label,
  unit = '',
  size = 160,
  thresholds,
  color,
}: RadialGaugeProps) {
  const [animated, setAnimated] = useState(false);
  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const fraction = Math.min(value / max, 1);
  const sweep = 0.75;
  const arcLength = circumference * sweep;
  const dash = fraction * arcLength;

  let strokeColor = color || '#06b6d4';
  if (thresholds && !color) {
    if (value <= thresholds.critical) strokeColor = '#ef4444';
    else if (value <= thresholds.warning) strokeColor = '#f59e0b';
    else strokeColor = '#22c55e';
  }

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="overflow-visible">
        <g transform={`rotate(135 ${size / 2} ${size / 2})`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1e293b"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${animated ? dash : 0} ${circumference}`}
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
        </g>
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          className="fill-white font-bold"
          style={{ fontSize: size * 0.18 }}
        >
          {value}
          {unit && <tspan className="fill-slate-400 text-base font-normal"> {unit}</tspan>}
        </text>
        <text
          x="50%"
          y="62%"
          textAnchor="middle"
          className="fill-slate-400"
          style={{ fontSize: size * 0.08 }}
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
