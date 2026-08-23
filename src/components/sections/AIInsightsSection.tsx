import { Sparkles, Brain, AlertTriangle, Zap, TrendingDown, Activity, ShieldCheck, Lightbulb, Target, Eye } from 'lucide-react';
import type { CityDataset } from '@/data';
import { formatNumber, formatPercent } from '@/lib/format';
import { Card } from '@/components/ui/Card';

interface Props { dataset: CityDataset; }

export function AIInsightsSection({ dataset }: Props) {
  const { grid, city, lossByArea, substations, alerts } = dataset;
  const isReal = city.isReal;

  const healthStatus = grid.averageHealthScore >= 85 ? 'strong' : grid.averageHealthScore >= 75 ? 'moderate' : 'needs attention';
  const healthColor = grid.averageHealthScore >= 85 ? 'text-emerald-400' : grid.averageHealthScore >= 75 ? 'text-amber-400' : 'text-red-400';

  const criticalAlerts = alerts.filter((a) => a.severity === 'critical');
  const highLossAreas = lossByArea.filter((a) => a.lossPercent > 4);
  const worstSubstations = [...substations].sort((a, b) => a.healthScore - b.healthScore).slice(0, 3);
  const overloadedSubstations = substations.filter((s) => s.loadPercent > 90);

  const insights = [
    {
      icon: <Activity className="w-5 h-5" />,
      title: 'Current Grid Health',
      color: 'cyan',
      content: `The ${city.name} grid is currently in ${healthStatus} condition with an average health score of ${grid.averageHealthScore}/100 and ${formatPercent(grid.gridUptime, 1)} uptime. ${grid.averageHealthScore >= 85 ? 'The infrastructure is performing well with minimal service disruptions.' : 'Some areas require monitoring to prevent degradation.'}`,
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: 'Transformer Overload Concerns',
      color: 'amber',
      content: `${formatNumber(grid.overloadedTransformers)} transformers are currently overloaded, representing ${formatPercent((grid.overloadedTransformers / grid.totalTransformers) * 100, 2)} of the total fleet. ${overloadedSubstations.length > 0 ? `Substations in ${overloadedSubstations.map((s) => s.area).join(', ')} are operating above 90% capacity and should be prioritized for load redistribution.` : 'Load distribution is within acceptable limits.'}`,
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Fault Alerts',
      color: 'red',
      content: `${formatNumber(grid.faultDetected)} faults have been detected across the grid. ${criticalAlerts.length > 0 ? `Critical alerts are concentrated in ${criticalAlerts.map((a) => a.area).join(' and ')}, indicating potential insulation or voltage regulation issues that require immediate field inspection.` : 'No critical fault alerts at this time.'} A total of ${formatNumber(grid.criticalAlerts)} critical and ${formatNumber(grid.highAlerts)} high-severity alerts remain open.`,
    },
    {
      icon: <TrendingDown className="w-5 h-5" />,
      title: 'Power-Loss Observations',
      color: 'orange',
      content: `${formatNumber(grid.abnormalPowerLoss)} transformers show abnormal power loss patterns. ${highLossAreas.length > 0 ? `The areas of ${highLossAreas.map((a) => a.area).join(', ')} exhibit loss rates above 4%, with ${lossByArea[0].area} being the highest at ${lossByArea[0].lossPercent}%. These areas may have aging infrastructure or theft/leakage issues.` : 'Power loss is within normal parameters.'}`,
    },
  ];

  const recommendations = [
    {
      icon: <Target className="w-4 h-4" />,
      title: `Prioritize inspection in ${lossByArea[0].area}`,
      detail: `This area has the highest power loss at ${lossByArea[0].lossPercent}%. Deploy field teams to audit ${formatNumber(lossByArea[0].transformers)} transformers for potential theft, leakage, or equipment degradation.`,
    },
    {
      icon: <Eye className="w-4 h-4" />,
      title: `Monitor ${worstSubstations[0]?.area || 'critical'} substation closely`,
      detail: `Health score of ${worstSubstations[0]?.healthScore || 'N/A'}/100 is the lowest in the grid. Schedule preventive maintenance and review load distribution to prevent cascading failures.`,
    },
    {
      icon: <ShieldCheck className="w-4 h-4" />,
      title: 'Address critical alerts immediately',
      detail: `${formatNumber(grid.criticalAlerts)} critical alerts require immediate response. Establish a rapid-response protocol for transformer overload and voltage fluctuation events.`,
    },
    {
      icon: <Lightbulb className="w-4 h-4" />,
      title: 'Load redistribution strategy',
      detail: `${overloadedSubstations.length} substations are operating above 90% capacity. Consider redistributing load to neighboring substations with spare capacity, or plan capacity upgrades for high-demand areas.`,
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-white">AI Insights</h2>
          <span className="flex items-center gap-1 px-2 py-0.5 text-xs bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full font-medium">
            <Sparkles className="w-3 h-3" /> AI-Powered
          </span>
        </div>
        <p className="text-sm text-slate-500">Automated analysis of grid data for {city.name}</p>
        <p className="text-xs text-slate-600 mt-1">AI-assisted summaries help interpret available grid information and highlight notable conditions.</p>
      </div>

      {/* AI disclaimer */}
      <div className={`flex items-start gap-3 p-4 rounded-xl border ${isReal ? 'bg-slate-900/60 border-slate-800' : 'bg-amber-500/5 border-amber-500/20'}`}>
        <Brain className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isReal ? 'text-cyan-400' : 'text-amber-400'}`} />
        <div>
          <p className="text-sm text-slate-300">
            {isReal
              ? `These insights are generated by analyzing the real ${city.name} grid dataset. The analysis is based on the provided operational metrics and does not use external prediction models.`
              : `This city uses demo/simulated data. The insights below are generated from simulated values and should be treated as prototype analysis only. They will reflect real conditions once live data is connected.`}
          </p>
        </div>
      </div>

      {/* Grid health summary banner */}
      <div className="bg-gradient-to-r from-slate-900/80 to-slate-900/40 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-cyan-500/10">
            <Activity className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-base font-semibold text-white">Grid Health Assessment</h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Based on the current data, the {city.name} grid is operating at a <span className={healthColor}>{healthStatus}</span> level.
          The average health score of <span className="text-white font-semibold">{grid.averageHealthScore}/100</span> with <span className="text-white font-semibold">{formatPercent(grid.gridUptime, 1)}</span> uptime
          indicates {grid.averageHealthScore >= 85 ? 'a well-maintained infrastructure with minor areas of concern.' : 'that while the grid is functional, several areas need attention to maintain reliability.'}
          The system has identified <span className="text-red-400 font-semibold">{formatNumber(grid.criticalAlerts)} critical alerts</span> and <span className="text-amber-400 font-semibold">{formatNumber(grid.overloadedTransformers)} overloaded transformers</span> that warrant immediate attention.
        </p>
      </div>

      {/* Insight cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, i) => {
          const c = colorMap[insight.color];
          return (
            <div key={i} className={`p-4 bg-slate-900/60 border ${c.border} rounded-xl`}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className={`p-2 rounded-lg ${c.bg} ${c.text}`}>{insight.icon}</div>
                <h4 className="text-sm font-semibold text-white">{insight.title}</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{insight.content}</p>
            </div>
          );
        })}
      </div>

      {/* Recommended areas for monitoring */}
      <Card title="Recommended Areas for Monitoring" subtitle="AI-suggested priorities based on current data" icon={<Target className="w-4 h-4" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 bg-slate-800/40 rounded-lg border border-slate-800">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 flex-shrink-0">
                {rec.icon}
              </div>
              <div>
                <h5 className="text-sm font-semibold text-white mb-1">{rec.title}</h5>
                <p className="text-xs text-slate-400 leading-relaxed">{rec.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Key metrics summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
          <p className="text-2xl font-bold text-emerald-400">{grid.averageHealthScore}</p>
          <p className="text-xs text-slate-500 mt-1">Health Score</p>
        </div>
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
          <p className="text-2xl font-bold text-cyan-400">{formatPercent(grid.gridUptime, 1)}</p>
          <p className="text-xs text-slate-500 mt-1">Grid Uptime</p>
        </div>
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
          <p className="text-2xl font-bold text-red-400">{formatNumber(grid.criticalAlerts)}</p>
          <p className="text-xs text-slate-500 mt-1">Critical Alerts</p>
        </div>
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
          <p className="text-2xl font-bold text-amber-400">{formatNumber(grid.overloadedTransformers)}</p>
          <p className="text-xs text-slate-500 mt-1">Overloaded</p>
        </div>
      </div>
    </div>
  );
}
