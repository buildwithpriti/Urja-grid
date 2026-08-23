import { useState } from 'react';
import { Bell, AlertTriangle, Zap, ShieldAlert, Clock, CheckCircle2, Eye, BarChart3 } from 'lucide-react';
import type { CityDataset, Alert } from '@/data';
import { formatNumber } from '@/lib/format';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { SeverityBadge } from '@/components/ui/StatusBadge';
import { DonutChart, DonutLegend } from '@/components/charts/DonutChart';
import { BarChart } from '@/components/charts/BarChart';

interface Props { dataset: CityDataset; }

const severityFilters = ['all', 'critical', 'high', 'medium', 'low'] as const;
const statusFilters = ['all', 'open', 'acknowledged', 'resolved'] as const;

export function AlertsSection({ dataset }: Props) {
  const { grid, alerts, city } = dataset;
  const [sevFilter, setSevFilter] = useState<typeof severityFilters[number]>('all');
  const [statusFilter, setStatusFilter] = useState<typeof statusFilters[number]>('all');

  const filtered = alerts.filter((a) => {
    const sevMatch = sevFilter === 'all' || a.severity === sevFilter;
    const statusMatch = statusFilter === 'all' || a.status === statusFilter;
    return sevMatch && statusMatch;
  });

  const alertSegments = [
    { label: 'Critical', value: grid.criticalAlerts, color: '#ef4444' },
    { label: 'High', value: grid.highAlerts, color: '#f97316' },
    { label: 'Medium', value: grid.mediumAlerts, color: '#f59e0b' },
    { label: 'Low', value: grid.lowAlerts, color: '#3b82f6' },
  ];

  const severityBarData = [
    { label: 'Critical', value: grid.criticalAlerts, color: '#ef4444' },
    { label: 'High', value: grid.highAlerts, color: '#f97316' },
    { label: 'Medium', value: grid.mediumAlerts, color: '#f59e0b' },
    { label: 'Low', value: grid.lowAlerts, color: '#3b82f6' },
  ];

  const statusIcon = (status: Alert['status']) => {
    switch (status) {
      case 'open': return <ShieldAlert className="w-3.5 h-3.5 text-red-400" />;
      case 'acknowledged': return <Eye className="w-3.5 h-3.5 text-amber-400" />;
      case 'resolved': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white">Alerts & Faults</h2>
        <p className="text-sm text-slate-500">Grid alerts and fault monitoring for {city.name}</p>
        <p className="text-xs text-slate-600 mt-1">Prioritized alerts help identify conditions that may require investigation or attention.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard label="Total Open Alerts" value={formatNumber(grid.totalOpenAlerts)} icon={<Bell className="w-5 h-5" />} accent="cyan" />
        <StatCard label="Critical" value={formatNumber(grid.criticalAlerts)} icon={<ShieldAlert className="w-5 h-5" />} accent="red" />
        <StatCard label="High" value={formatNumber(grid.highAlerts)} icon={<AlertTriangle className="w-5 h-5" />} accent="amber" />
        <StatCard label="Medium" value={formatNumber(grid.mediumAlerts)} icon={<Bell className="w-5 h-5" />} accent="amber" />
        <StatCard label="Low" value={formatNumber(grid.lowAlerts)} icon={<Bell className="w-5 h-5" />} accent="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Alert Severity Distribution" subtitle="Open alerts by severity level" icon={<AlertTriangle className="w-4 h-4" />}>
          <div className="flex items-center justify-center gap-6">
            <DonutChart segments={alertSegments} centerValue={formatNumber(grid.totalOpenAlerts)} centerLabel="Total" size={170} thickness={28} />
            <div className="flex-1">
              <DonutLegend segments={alertSegments} formatValue={(v) => formatNumber(v)} />
            </div>
          </div>
        </Card>

        <Card title="Alert Severity Comparison" subtitle="Count by severity" icon={<BarChart3 className="w-4 h-4" />}>
          <div className="py-4">
            <BarChart data={severityBarData} height={200} formatValue={(v) => formatNumber(v)} />
          </div>
        </Card>
      </div>

      {/* Alerts table */}
      <Card
        title="Active Alerts Log"
        subtitle={`${filtered.length} alerts`}
        icon={<Bell className="w-4 h-4" />}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              {severityFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setSevFilter(f)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg capitalize transition-colors ${
                    sevFilter === f ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="w-px h-5 bg-slate-700" />
            <div className="flex items-center gap-1">
              {statusFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg capitalize transition-colors ${
                    statusFilter === f ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-2.5">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">No alerts match the selected filters.</div>
          ) : (
            filtered.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3.5 bg-slate-800/40 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="mt-0.5">
                  {alert.severity === 'critical' ? <Zap className="w-5 h-5 text-red-400" /> : alert.severity === 'high' ? <AlertTriangle className="w-5 h-5 text-orange-400" /> : <Bell className="w-5 h-5 text-slate-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <SeverityBadge severity={alert.severity} />
                    <span className="text-sm font-semibold text-white">{alert.title}</span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      {statusIcon(alert.status)}
                      <span className="capitalize">{alert.status}</span>
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{alert.message}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span>{alert.transformerId}</span>
                    <span>·</span>
                    <span>{alert.area}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {alert.timestamp}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
