interface StatusBadgeProps {
  status: 'healthy' | 'warning' | 'critical';
  size?: 'sm' | 'md';
}

const statusConfig = {
  healthy: { label: 'Healthy', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
  warning: { label: 'Warning', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-400' },
  critical: { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-400' },
};

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const c = statusConfig[status];
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return (
    <span className={`inline-flex items-center gap-1.5 ${padding} ${c.bg} ${c.color} ${c.border} border rounded-full font-medium`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
      {c.label}
    </span>
  );
}

interface SeverityBadgeProps {
  severity: 'critical' | 'high' | 'medium' | 'low';
}

const severityConfig = {
  critical: { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  high: { label: 'High', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  medium: { label: 'Medium', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  low: { label: 'Low', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const c = severityConfig[severity];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs ${c.bg} ${c.color} ${c.border} border rounded-full font-medium`}>
      {c.label}
    </span>
  );
}
