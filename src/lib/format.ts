export function formatNumber(n: number): string {
  return n.toLocaleString('en-IN');
}

export function formatPercent(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}

export function formatCompact(n: number): string {
  if (n >= 10000000) return `${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `${(n / 100000).toFixed(2)} L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function healthStatus(score: number): 'healthy' | 'warning' | 'critical' {
  if (score >= 80) return 'healthy';
  if (score >= 65) return 'warning';
  return 'critical';
}

export function healthColor(status: 'healthy' | 'warning' | 'critical'): string {
  switch (status) {
    case 'healthy': return '#22c55e';
    case 'warning': return '#f59e0b';
    case 'critical': return '#ef4444';
  }
}

export function severityColor(severity: 'critical' | 'high' | 'medium' | 'low'): string {
  switch (severity) {
    case 'critical': return '#ef4444';
    case 'high': return '#f97316';
    case 'medium': return '#f59e0b';
    case 'low': return '#3b82f6';
  }
}
