import { useEffect, useState } from 'react';

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
  maxValue?: number;
  horizontal?: boolean;
  formatValue?: (v: number) => string;
  unit?: string;
  color?: string;
  className?: string;
}

export function BarChart({
  data,
  height = 200,
  maxValue,
  horizontal = false,
  formatValue,
  unit = '',
  color,
  className,
}: BarChartProps) {
  const [animated, setAnimated] = useState(false);
  const max = maxValue || Math.max(...data.map((d) => d.value)) || 1;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, [data]);

  if (horizontal) {
    return (
      <div className="flex flex-col gap-2.5">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-slate-400 w-20 truncate text-right">{d.label}</span>
            <div className="flex-1 h-6 bg-slate-800/60 rounded-md overflow-hidden relative">
              <div
                className="h-full rounded-md flex items-center justify-end px-2"
                style={{
                  width: animated ? `${(d.value / max) * 100}%` : '0%',
                  backgroundColor: d.color || color || '#06b6d4',
                  transition: `width 0.8s ease ${i * 0.05}s`,
                }}
              >
                <span className="text-xs font-semibold text-white whitespace-nowrap">
                  {formatValue ? formatValue(d.value) : `${d.value}${unit}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 flex-1 h-full justify-end">
          <span className="text-xs font-semibold text-slate-300">
            {formatValue ? formatValue(d.value) : d.value}
          </span>
          <div
            className="w-full rounded-t-md min-h-[4px]"
            style={{
              height: animated ? `${(d.value / max) * 100}%` : '0%',
              backgroundColor: d.color || color || '#06b6d4',
              transition: `height 0.8s ease ${i * 0.05}s`,
            }}
          />
          <span className="text-xs text-slate-400 truncate w-full text-center">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
