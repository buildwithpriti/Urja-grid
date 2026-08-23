import { useEffect, useRef, useState } from 'react';

interface DonutChartProps {
  segments: { label: string; value: number; color: string }[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;
  thickness?: number;
}

export function DonutChart({
  segments,
  centerLabel,
  centerValue,
  size = 180,
  thickness = 28,
}: DonutChartProps) {
  const [animated, setAnimated] = useState(false);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  let offset = 0;
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth={thickness}
        />
        {segments.map((seg, i) => {
          const fraction = seg.value / total;
          const dash = fraction * circumference;
          const gap = circumference - dash;
          const dashOffset = animated ? offset : circumference;
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-dashOffset}
              strokeLinecap="round"
              style={{ transition: `stroke-dashoffset 1s ease ${i * 0.15}s` }}
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      {(centerValue || centerLabel) && (
        <div className="-mt-[calc(50%+10px)] mb-[calc(50%-10px)] flex flex-col items-center justify-center pointer-events-none">
          {centerValue && <span className="text-2xl font-bold text-white">{centerValue}</span>}
          {centerLabel && <span className="text-xs text-slate-400 mt-0.5">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
}

interface DonutLegendProps {
  segments: { label: string; value: number; color: string }[];
  formatValue?: (v: number) => string;
}

export function DonutLegend({ segments, formatValue }: DonutLegendProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  return (
    <div className="flex flex-col gap-2">
      {segments.map((seg, i) => (
        <div key={i} className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: seg.color }} />
            <span className="text-sm text-slate-300">{seg.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{formatValue ? formatValue(seg.value) : seg.value.toLocaleString('en-IN')}</span>
            <span className="text-xs text-slate-500 w-10 text-right">{((seg.value / total) * 100).toFixed(1)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
