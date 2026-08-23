interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  height?: number;
  showValue?: boolean;
  unit?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  color = '#06b6d4',
  height = 8,
  showValue = false,
  unit = '',
}: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex flex-col gap-1 w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs text-slate-400">{label}</span>}
          {showValue && <span className="text-xs font-semibold text-slate-300">{value}{unit}</span>}
        </div>
      )}
      <div className="w-full bg-slate-800/60 rounded-full overflow-hidden" style={{ height }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            backgroundColor: color,
            transition: 'width 0.8s ease',
          }}
        />
      </div>
    </div>
  );
}
