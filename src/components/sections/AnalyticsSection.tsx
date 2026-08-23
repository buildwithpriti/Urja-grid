import { BarChart3, TrendingUp, Activity, Zap, TrendingDown, Calendar } from 'lucide-react';
import type { CityDataset } from '@/data';
import { formatNumber, formatPercent } from '@/lib/format';
import { Card } from '@/components/ui/Card';
import { AreaChart } from '@/components/charts/AreaChart';
import { BarChart } from '@/components/charts/BarChart';
import { ProgressBar } from '@/components/charts/ProgressBar';
import { Sparkline } from '@/components/charts/Sparkline';

interface Props { dataset: CityDataset; }

export function AnalyticsSection({ dataset }: Props) {
  const { grid, weeklyTrend, monthlyTrend, substations, lossByArea, city } = dataset;

  const loadTrend = monthlyTrend.map((t) => ({ label: t.label, value: t.load }));
  const faultTrend = monthlyTrend.map((t) => ({ label: t.label, value: t.faults }));
  const lossTrend = monthlyTrend.map((t) => ({ label: t.label, value: t.powerLoss }));

  const areaComparison = lossByArea.slice(0, 8).map((a) => ({
    label: a.area,
    value: a.transformers,
    color: '#06b6d4',
  }));

  const substationLoad = substations.map((s) => ({ label: s.area, value: s.loadPercent, color: s.loadPercent > 90 ? '#ef4444' : s.loadPercent > 80 ? '#f59e0b' : '#22c55e' }));

  const weeklyLoadSpark = weeklyTrend.map((t) => t.load);
  const weeklyFaultSpark = weeklyTrend.map((t) => t.faults);
  const weeklyUptimeSpark = weeklyTrend.map((t) => t.uptime);
  const weeklyLossSpark = weeklyTrend.map((t) => t.powerLoss);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white">Analytics</h2>
        <p className="text-sm text-slate-500">Deep-dive analytics for {city.name} grid performance</p>
        <p className="text-xs text-slate-600 mt-1">Trend analysis and comparative metrics across time periods and monitored areas.</p>
      </div>

      {/* Sparkline summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Weekly Load Avg</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-end justify-between">
            <span className="text-xl font-bold text-white">{formatPercent(weeklyTrend.reduce((s, t) => s + t.load, 0) / weeklyTrend.length, 0)}</span>
            <Sparkline data={weeklyLoadSpark} width={80} height={28} color="#06b6d4" />
          </div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Weekly Faults</span>
            <Zap className="w-4 h-4 text-red-400" />
          </div>
          <div className="flex items-end justify-between">
            <span className="text-xl font-bold text-white">{weeklyTrend.reduce((s, t) => s + t.faults, 0)}</span>
            <Sparkline data={weeklyFaultSpark} width={80} height={28} color="#ef4444" />
          </div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Weekly Uptime Avg</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-end justify-between">
            <span className="text-xl font-bold text-white">{formatPercent(weeklyTrend.reduce((s, t) => s + t.uptime, 0) / weeklyTrend.length, 2)}</span>
            <Sparkline data={weeklyUptimeSpark} width={80} height={28} color="#22c55e" />
          </div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Weekly Loss Avg</span>
            <TrendingDown className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-end justify-between">
            <span className="text-xl font-bold text-white">{formatPercent(weeklyTrend.reduce((s, t) => s + t.powerLoss, 0) / weeklyTrend.length, 1)}</span>
            <Sparkline data={weeklyLossSpark} width={80} height={28} color="#f59e0b" />
          </div>
        </div>
      </div>

      {/* Monthly trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Monthly Load Trend" subtitle="Average load percentage by month" icon={<Calendar className="w-4 h-4" />}>
          <AreaChart data={loadTrend} height={200} color="#06b6d4" unit="%" />
        </Card>
        <Card title="Monthly Fault Trend" subtitle="Fault count by month" icon={<Zap className="w-4 h-4" />}>
          <BarChart data={faultTrend} height={200} color="#ef4444" formatValue={(v) => formatNumber(v)} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Monthly Power Loss Trend" subtitle="Average loss percentage by month" icon={<TrendingDown className="w-4 h-4" />}>
          <AreaChart data={lossTrend} height={200} color="#f59e0b" unit="%" />
        </Card>
        <Card title="Transformers by Area" subtitle="Distribution across areas" icon={<BarChart3 className="w-4 h-4" />}>
          <BarChart data={areaComparison} horizontal formatValue={(v) => formatNumber(v)} />
        </Card>
      </div>

      {/* Substation load comparison */}
      <Card title="Substation Load Comparison" subtitle="Current load percentage by substation" icon={<Activity className="w-4 h-4" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 py-1">
          {substationLoad.map((s, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-300">{s.label}</span>
                <span className={`text-xs font-semibold ${s.color === '#ef4444' ? 'text-red-400' : s.color === '#f59e0b' ? 'text-amber-400' : 'text-emerald-400'}`}>{s.value}%</span>
              </div>
              <ProgressBar value={s.value} height={6} color={s.color} />
            </div>
          ))}
        </div>
      </Card>

      {/* Summary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card title="Operational Summary" icon={<Activity className="w-4 h-4" />}>
          <div className="flex flex-col gap-3 py-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active Rate</span>
              <span className="text-sm font-semibold text-emerald-400">{formatPercent((grid.activeTransformers / grid.totalTransformers) * 100, 2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Overload Rate</span>
              <span className="text-sm font-semibold text-amber-400">{formatPercent((grid.overloadedTransformers / grid.totalTransformers) * 100, 2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Fault Rate</span>
              <span className="text-sm font-semibold text-red-400">{formatPercent((grid.faultDetected / grid.totalTransformers) * 100, 2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Abnormal Loss Rate</span>
              <span className="text-sm font-semibold text-orange-400">{formatPercent((grid.abnormalPowerLoss / grid.totalTransformers) * 100, 2)}</span>
            </div>
          </div>
        </Card>

        <Card title="Alert Summary" icon={<BarChart3 className="w-4 h-4" />}>
          <div className="flex flex-col gap-3 py-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Critical %</span>
              <span className="text-sm font-semibold text-red-400">{formatPercent((grid.criticalAlerts / grid.totalOpenAlerts) * 100, 1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">High %</span>
              <span className="text-sm font-semibold text-orange-400">{formatPercent((grid.highAlerts / grid.totalOpenAlerts) * 100, 1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Medium %</span>
              <span className="text-sm font-semibold text-amber-400">{formatPercent((grid.mediumAlerts / grid.totalOpenAlerts) * 100, 1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Low %</span>
              <span className="text-sm font-semibold text-blue-400">{formatPercent((grid.lowAlerts / grid.totalOpenAlerts) * 100, 1)}</span>
            </div>
          </div>
        </Card>

        <Card title="Health Summary" icon={<TrendingUp className="w-4 h-4" />}>
          <div className="flex flex-col gap-3 py-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Avg Health</span>
              <span className="text-sm font-semibold text-emerald-400">{grid.averageHealthScore}/100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Grid Uptime</span>
              <span className="text-sm font-semibold text-cyan-400">{formatPercent(grid.gridUptime, 1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Substations</span>
              <span className="text-sm font-semibold text-white">{substations.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Transformers</span>
              <span className="text-sm font-semibold text-white">{formatNumber(grid.totalTransformers)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
