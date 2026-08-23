import { Activity, ShieldCheck, Heart, Zap, TrendingUp, Gauge } from 'lucide-react';
import type { CityDataset } from '@/data';
import { formatNumber, formatPercent } from '@/lib/format';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { RadialGauge } from '@/components/charts/RadialGauge';
import { DonutChart, DonutLegend } from '@/components/charts/DonutChart';
import { AreaChart } from '@/components/charts/AreaChart';
import { BarChart } from '@/components/charts/BarChart';
import { ProgressBar } from '@/components/charts/ProgressBar';

interface Props { dataset: CityDataset; }

export function GridHealthSection({ dataset }: Props) {
  const { grid, healthDistribution, weeklyTrend, monthlyTrend, substations, city } = dataset;

  const healthSegments = healthDistribution.map((h) => ({
    label: h.label,
    value: h.value,
    color: h.status === 'healthy' ? '#22c55e' : h.status === 'warning' ? '#f59e0b' : '#ef4444',
  }));

  const uptimeVsFaults = weeklyTrend.map((t) => ({ label: t.label, value: t.uptime }));
  const faultTrend = weeklyTrend.map((t) => ({ label: t.label, value: t.faults }));

  const sortedByHealth = [...substations].sort((a, b) => a.healthScore - b.healthScore);
  const worstSubstations = sortedByHealth.slice(0, 5);
  const bestSubstations = sortedByHealth.slice(-3).reverse();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white">Grid Health</h2>
        <p className="text-sm text-slate-500">Overall health assessment for {city.name} grid infrastructure</p>
        <p className="text-xs text-slate-600 mt-1">An overall indicator representing the current health condition of monitored grid infrastructure.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Avg Health Score" value={`${grid.averageHealthScore}/100`} icon={<Heart className="w-5 h-5" />} accent="green" sublabel="across all transformers" />
        <StatCard label="Grid Uptime" value={formatPercent(grid.gridUptime, 1)} icon={<ShieldCheck className="w-5 h-5" />} accent="cyan" sublabel="last 7 days" />
        <StatCard label="Faults Detected" value={formatNumber(grid.faultDetected)} icon={<Zap className="w-5 h-5" />} accent="red" />
        <StatCard label="Overloaded" value={formatNumber(grid.overloadedTransformers)} icon={<TrendingUp className="w-5 h-5" />} accent="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title="Health Score" subtitle="Overall grid health" icon={<Gauge className="w-4 h-4" />}>
          <div className="flex flex-col items-center py-2">
            <RadialGauge value={grid.averageHealthScore} label="Score" unit="/100" size={170} thresholds={{ warning: 75, critical: 60 }} />
          </div>
        </Card>

        <Card title="Grid Uptime" subtitle="Service availability" icon={<ShieldCheck className="w-4 h-4" />}>
          <div className="flex flex-col items-center py-2">
            <RadialGauge value={grid.gridUptime} label="Uptime" unit="%" size={170} color="#22c55e" />
          </div>
        </Card>

        <Card title="Health Distribution" subtitle="Transformer health breakdown" icon={<Activity className="w-4 h-4" />}>
          <div className="flex items-center justify-center gap-4">
            <DonutChart segments={healthSegments} centerValue={formatNumber(grid.totalTransformers)} centerLabel="Total" size={150} thickness={24} />
          </div>
          <div className="mt-3">
            <DonutLegend segments={healthSegments} formatValue={(v) => formatNumber(v)} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Weekly Uptime Trend" subtitle="Daily uptime percentage" icon={<ShieldCheck className="w-4 h-4" />}>
          <AreaChart data={uptimeVsFaults} height={200} color="#22c55e" unit="%" />
        </Card>

        <Card title="Weekly Fault Trend" subtitle="Daily fault count" icon={<Zap className="w-4 h-4" />}>
          <BarChart data={faultTrend} height={200} color="#ef4444" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Monthly Uptime Trend" subtitle="Long-term availability" icon={<TrendingUp className="w-4 h-4" />}>
          <AreaChart data={monthlyTrend.map((t) => ({ label: t.label, value: t.uptime }))} height={200} color="#06b6d4" unit="%" />
        </Card>

        <Card title="Monthly Load Trend" subtitle="Average load percentage" icon={<Gauge className="w-4 h-4" />}>
          <AreaChart data={monthlyTrend.map((t) => ({ label: t.label, value: t.load }))} height={200} color="#f59e0b" unit="%" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Worst-Performing Substations" subtitle="Lowest health scores — need attention" icon={<TrendingUp className="w-4 h-4" />}>
          <div className="flex flex-col gap-3 py-1">
            {worstSubstations.map((s) => (
              <div key={s.id}>
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <span className="text-sm font-medium text-white">{s.name}</span>
                    <span className="block text-xs text-slate-500">{s.area}</span>
                  </div>
                  <span className={`text-sm font-bold ${s.healthScore < 65 ? 'text-red-400' : 'text-amber-400'}`}>{s.healthScore}/100</span>
                </div>
                <ProgressBar value={s.healthScore} height={6} color={s.healthScore < 65 ? '#ef4444' : '#f59e0b'} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Best-Performing Substations" subtitle="Highest health scores" icon={<ShieldCheck className="w-4 h-4" />}>
          <div className="flex flex-col gap-3 py-1">
            {bestSubstations.map((s) => (
              <div key={s.id}>
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <span className="text-sm font-medium text-white">{s.name}</span>
                    <span className="block text-xs text-slate-500">{s.area}</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-400">{s.healthScore}/100</span>
                </div>
                <ProgressBar value={s.healthScore} height={6} color="#22c55e" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
