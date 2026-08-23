import { Box, CheckCircle2, XCircle, AlertTriangle, Zap, Activity, Bell, ShieldCheck, TrendingUp } from 'lucide-react';
import type { CityDataset } from '@/data';
import { formatNumber, formatPercent } from '@/lib/format';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { DonutChart, DonutLegend } from '@/components/charts/DonutChart';
import { RadialGauge } from '@/components/charts/RadialGauge';
import { BarChart } from '@/components/charts/BarChart';
import { AreaChart } from '@/components/charts/AreaChart';
import { Sparkline } from '@/components/charts/Sparkline';
import { SeverityBadge } from '@/components/ui/StatusBadge';

interface Props { dataset: CityDataset; }

export function OverviewSection({ dataset }: Props) {
  const { grid, city, healthDistribution, alerts, weeklyTrend, lossByArea } = dataset;
  const isReal = city.isReal;

  const activeVsInactive = [
    { label: 'Active', value: grid.activeTransformers, color: '#22c55e' },
    { label: 'Inactive', value: grid.inactiveTransformers, color: '#475569' },
  ];

  const healthSegments = healthDistribution.map((h) => ({
    label: h.label,
    value: h.value,
    color: h.status === 'healthy' ? '#22c55e' : h.status === 'warning' ? '#f59e0b' : '#ef4444',
  }));

  const alertSegments = [
    { label: 'Critical', value: grid.criticalAlerts, color: '#ef4444' },
    { label: 'High', value: grid.highAlerts, color: '#f97316' },
    { label: 'Medium', value: grid.mediumAlerts, color: '#f59e0b' },
    { label: 'Low', value: grid.lowAlerts, color: '#3b82f6' },
  ];

  const overloadData = [
    { label: 'Overloaded', value: grid.overloadedTransformers, color: '#f59e0b' },
    { label: 'Faulty', value: grid.faultDetected, color: '#ef4444' },
    { label: 'Abnormal Loss', value: grid.abnormalPowerLoss, color: '#f97316' },
  ];

  const uptimeTrend = weeklyTrend.map((t) => t.uptime);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-white">{city.name} Grid Overview</h2>
          {isReal ? (
            <span className="px-2 py-0.5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-medium">Real Data</span>
          ) : (
            <span className="px-2 py-0.5 text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full font-medium">Demo Data</span>
          )}
        </div>
        <p className="text-sm text-slate-500">Real-time monitoring of {formatNumber(grid.totalTransformers)} transformers across {city.state}</p>
        <p className="text-xs text-slate-600 mt-1">An overall snapshot of grid infrastructure health, operational status, and active alerts.</p>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatCard label="Total Transformers" value={formatNumber(grid.totalTransformers)} icon={<Box className="w-5 h-5" />} accent="cyan" />
        <StatCard label="Active" value={formatNumber(grid.activeTransformers)} icon={<CheckCircle2 className="w-5 h-5" />} accent="green" sublabel={`${formatPercent((grid.activeTransformers / grid.totalTransformers) * 100, 1)} operational`} />
        <StatCard label="Inactive" value={formatNumber(grid.inactiveTransformers)} icon={<XCircle className="w-5 h-5" />} accent="red" sublabel="Needs attention" />
        <StatCard label="Overloaded" value={formatNumber(grid.overloadedTransformers)} icon={<AlertTriangle className="w-5 h-5" />} accent="amber" />
        <StatCard label="Faults Detected" value={formatNumber(grid.faultDetected)} icon={<Zap className="w-5 h-5" />} accent="red" />
        <StatCard label="Abnormal Power Loss" value={formatNumber(grid.abnormalPowerLoss)} icon={<TrendingUp className="w-5 h-5" />} accent="amber" />
      </div>

      {/* Health & Uptime gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title="Grid Health Score" subtitle="Average across all transformers" icon={<Activity className="w-4 h-4" />}>
          <div className="flex flex-col items-center py-2">
            <RadialGauge value={grid.averageHealthScore} label="Health Score" unit="/100" size={170} thresholds={{ warning: 75, critical: 60 }} />
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-400">Good</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-xs text-slate-400">Warning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="text-xs text-slate-400">Critical</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Grid Uptime" subtitle="Last 7 days average" icon={<ShieldCheck className="w-4 h-4" />}>
          <div className="flex flex-col items-center py-2">
            <RadialGauge value={grid.gridUptime} max={100} label="Uptime" unit="%" size={170} color="#22c55e" />
            <div className="mt-3 w-full">
              <Sparkline data={uptimeTrend} width={240} height={32} color="#22c55e" />
            </div>
          </div>
        </Card>

        <Card title="Open Alerts" subtitle="Active alerts by severity" icon={<Bell className="w-4 h-4" />}>
          <div className="flex items-center justify-center gap-4 py-2">
            <DonutChart segments={alertSegments} centerValue={formatNumber(grid.totalOpenAlerts)} centerLabel="Total Alerts" size={160} thickness={24} />
          </div>
          <div className="mt-2">
            <DonutLegend segments={alertSegments} />
          </div>
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Active vs Inactive Transformers" subtitle="Operational status distribution" icon={<Box className="w-4 h-4" />}>
          <div className="flex items-center justify-center gap-6">
            <DonutChart segments={activeVsInactive} centerValue={formatPercent((grid.activeTransformers / grid.totalTransformers) * 100, 1)} centerLabel="Active" size={160} thickness={28} />
            <div className="flex-1">
              <DonutLegend segments={activeVsInactive} />
            </div>
          </div>
        </Card>

        <Card title="Transformer Health Distribution" subtitle="Health status across grid" icon={<Activity className="w-4 h-4" />}>
          <div className="flex items-center justify-center gap-6">
            <DonutChart segments={healthSegments} centerValue={formatNumber(grid.totalTransformers)} centerLabel="Total" size={160} thickness={28} />
            <div className="flex-1">
              <DonutLegend segments={healthSegments} />
            </div>
          </div>
        </Card>
      </div>

      {/* Overloaded & Faulty + Uptime trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Overloaded & Faulty Transformers" subtitle="Problem indicators" icon={<AlertTriangle className="w-4 h-4" />}>
          <BarChart data={overloadData} height={200} formatValue={(v) => formatNumber(v)} />
        </Card>

        <Card title="Weekly Uptime Trend" subtitle="Grid uptime over past week" icon={<TrendingUp className="w-4 h-4" />}>
          <AreaChart data={weeklyTrend.map((t) => ({ label: t.label, value: t.uptime }))} height={200} color="#22c55e" unit="%" />
        </Card>
      </div>

      {/* Recent alerts + Power loss by area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Recent Alerts" subtitle="Latest grid alerts" icon={<Bell className="w-4 h-4" />}>
          <div className="flex flex-col gap-2.5">
            {alerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="flex items-center gap-3 p-2.5 bg-slate-800/40 rounded-lg border border-slate-800">
                <SeverityBadge severity={alert.severity} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{alert.title}</p>
                  <p className="text-xs text-slate-500">{alert.area} · {alert.transformerId}</p>
                </div>
                <span className="text-xs text-slate-600 whitespace-nowrap">{alert.timestamp.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Power Loss by Area" subtitle="Top areas by loss percentage" icon={<TrendingUp className="w-4 h-4" />}>
          <BarChart
            data={lossByArea.slice(0, 6).map((a) => ({ label: a.area, value: a.lossPercent, color: a.lossPercent > 5 ? '#ef4444' : a.lossPercent > 3.5 ? '#f59e0b' : '#22c55e' }))}
            horizontal
            formatValue={(v) => `${v}%`}
          />
        </Card>
      </div>
    </div>
  );
}
