import { TrendingDown, Activity, Zap, AlertTriangle } from 'lucide-react';
import type { CityDataset } from '@/data';
import { formatNumber, formatPercent } from '@/lib/format';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { BarChart } from '@/components/charts/BarChart';
import { AreaChart } from '@/components/charts/AreaChart';
import { ProgressBar } from '@/components/charts/ProgressBar';

interface Props { dataset: CityDataset; }

export function PowerLossSection({ dataset }: Props) {
  const { grid, lossByArea, weeklyTrend, monthlyTrend, substations, city } = dataset;
  const avgLoss = lossByArea.reduce((s, a) => s + a.lossPercent, 0) / lossByArea.length;
  const maxLoss = lossByArea[0];
  const highLossAreas = lossByArea.filter((a) => a.lossPercent > 4);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white">Power Loss Analysis</h2>
        <p className="text-sm text-slate-500">Abnormal power loss monitoring for {city.name}</p>
        <p className="text-xs text-slate-600 mt-1">Analyze abnormal power-loss patterns across monitored areas.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Abnormal Power Loss" value={formatNumber(grid.abnormalPowerLoss)} icon={<TrendingDown className="w-5 h-5" />} accent="amber" sublabel="transformers affected" />
        <StatCard label="Avg Loss Rate" value={formatPercent(avgLoss, 1)} icon={<Activity className="w-5 h-5" />} accent="cyan" sublabel="across all areas" />
        <StatCard label="Highest Loss Area" value={maxLoss.area} icon={<AlertTriangle className="w-5 h-5" />} accent="red" sublabel={`${maxLoss.lossPercent}% loss`} />
        <StatCard label="High-Loss Areas" value={highLossAreas.length} icon={<Zap className="w-5 h-5" />} accent="amber" sublabel="above 4% threshold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Power Loss by Area" subtitle="Areas ranked by loss percentage" icon={<TrendingDown className="w-4 h-4" />}>
          <BarChart
            data={lossByArea.map((a) => ({
              label: a.area,
              value: a.lossPercent,
              color: a.lossPercent > 5 ? '#ef4444' : a.lossPercent > 3.5 ? '#f59e0b' : '#22c55e',
            }))}
            horizontal
            formatValue={(v) => `${v}%`}
          />
        </Card>

        <Card title="Weekly Power Loss Trend" subtitle="Average loss percentage over past week" icon={<Activity className="w-4 h-4" />}>
          <AreaChart data={weeklyTrend.map((t) => ({ label: t.label, value: t.powerLoss }))} height={220} color="#f59e0b" unit="%" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Monthly Power Loss Trend" subtitle="Long-term loss analysis" icon={<TrendingDown className="w-4 h-4" />}>
          <AreaChart data={monthlyTrend.map((t) => ({ label: t.label, value: t.powerLoss }))} height={220} color="#f97316" unit="%" />
        </Card>

        <Card title="Substation Loss Breakdown" subtitle="Individual substation loss rates" icon={<Zap className="w-4 h-4" />}>
          <div className="flex flex-col gap-3 py-1">
            {substations.slice(0, 8).map((s) => (
              <div key={s.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-300">{s.name}</span>
                  <span className={`text-xs font-semibold ${s.powerLossPercent > 5 ? 'text-red-400' : s.powerLossPercent > 3.5 ? 'text-amber-400' : 'text-emerald-400'}`}>{s.powerLossPercent}%</span>
                </div>
                <ProgressBar
                  value={s.powerLossPercent}
                  max={8}
                  height={6}
                  color={s.powerLossPercent > 5 ? '#ef4444' : s.powerLossPercent > 3.5 ? '#f59e0b' : '#22c55e'}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="High-Loss Area Watchlist" subtitle="Areas exceeding 4% loss threshold — prioritize for inspection" icon={<AlertTriangle className="w-4 h-4" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {highLossAreas.map((a) => (
            <div key={a.area} className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">{a.area}</span>
                <span className={`text-sm font-bold ${a.lossPercent > 5 ? 'text-red-400' : 'text-amber-400'}`}>{a.lossPercent}%</span>
              </div>
              <ProgressBar value={a.lossPercent} max={8} height={6} color={a.lossPercent > 5 ? '#ef4444' : '#f59e0b'} />
              <p className="text-xs text-slate-500 mt-2">{formatNumber(a.transformers)} transformers in this area</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
