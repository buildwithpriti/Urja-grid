import { useEffect, useState, useRef } from 'react';

interface AreaChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  unit?: string;
  formatValue?: (v: number) => string;
}

export function AreaChart({
  data,
  height = 180,
  color = '#06b6d4',
  unit = '',
  formatValue,
}: AreaChartProps) {
  const [animated, setAnimated] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 600;
  const padding = { top: 20, right: 16, bottom: 28, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const yMin = min - range * 0.1;
  const yMax = max + range * 0.1;
  const yRange = yMax - yMin || 1;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, [data]);

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartW,
    y: padding.top + (1 - (d.value - yMin) / yRange) * chartH,
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

  const gridLines = 4;
  const yLabels = Array.from({ length: gridLines + 1 }, (_, i) => yMin + (yRange / gridLines) * i);

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * width;
    let closest = 0;
    let minDist = Infinity;
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - x);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setHoverIdx(closest);
  }

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height }}
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIdx(null)}
      >
        <defs>
          <linearGradient id={`areaGrad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {yLabels.map((v, i) => {
          const y = padding.top + (1 - (v - yMin) / yRange) * chartH;
          return (
            <g key={i}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
              <text x={padding.left - 6} y={y + 3} textAnchor="end" className="fill-slate-500" style={{ fontSize: 10 }}>
                {formatValue ? formatValue(v) : `${v.toFixed(1)}${unit}`}
              </text>
            </g>
          );
        })}
        {data.map((d, i) => (
          <text key={i} x={points[i].x} y={height - 8} textAnchor="middle" className="fill-slate-500" style={{ fontSize: 10 }}>
            {d.label}
          </text>
        ))}
        <path d={areaPath} fill={`url(#areaGrad-${color.replace('#', '')})`} opacity={animated ? 1 : 0} style={{ transition: 'opacity 0.8s ease' }} />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={animated ? '' : '0 1000'}
          style={{ transition: 'stroke-dasharray 1.2s ease' }}
        />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={hoverIdx === i ? 5 : 3} fill={color} stroke="#0f172a" strokeWidth="2" style={{ transition: 'r 0.15s ease' }} />
            {hoverIdx === i && (
              <g>
                <rect x={p.x - 40} y={p.y - 30} width="80" height="22" rx="4" fill="#0f172a" stroke={color} strokeWidth="1" />
                <text x={p.x} y={p.y - 15} textAnchor="middle" className="fill-white font-semibold" style={{ fontSize: 11 }}>
                  {formatValue ? formatValue(p.value) : `${p.value}${unit}`}
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
