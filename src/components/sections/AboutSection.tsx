import { Zap, Box, Activity, AlertTriangle, TrendingDown, ShieldCheck, Bell, MapPin, ArrowRight, Database, Brain, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const monitoringItems = [
  { icon: Box, label: 'Transformer Infrastructure', desc: 'Total, active, inactive and overloaded transformers' },
  { icon: Activity, label: 'Grid Health', desc: 'Average health score across all monitored assets' },
  { icon: ShieldCheck, label: 'Transformer Status', desc: 'Operational state of each transformer' },
  { icon: AlertTriangle, label: 'Overloaded Transformers', desc: 'Transformers operating beyond rated capacity' },
  { icon: Zap, label: 'Fault Conditions', desc: 'Detected faults requiring investigation' },
  { icon: TrendingDown, label: 'Abnormal Power Loss', desc: 'Transformers with unusual loss patterns' },
  { icon: ShieldCheck, label: 'Grid Uptime', desc: 'Service availability over time' },
  { icon: Bell, label: 'Alert Severity', desc: 'Critical, high, medium and low priority alerts' },
  { icon: MapPin, label: 'Area-wise Grid Conditions', desc: 'Geographic breakdown of grid performance' },
];

const flowSteps = [
  { icon: Database, label: 'Data', desc: 'Grid data is collected from connected sources' },
  { icon: Activity, label: 'Monitoring', desc: 'Data is organized and visualized in real time' },
  { icon: BarChart3, label: 'Analysis', desc: 'Metrics are analyzed for patterns and anomalies' },
  { icon: Brain, label: 'AI Insights', desc: 'AI summarizes conditions and highlights concerns' },
  { icon: ShieldCheck, label: 'Decision Support', desc: 'Operators get actionable information for action' },
];

export function AboutSection() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white">About UrjaGrid</h2>
        <p className="text-sm text-slate-500">Understanding the platform behind the dashboard</p>
      </div>

      {/* What is UrjaGrid */}
      <Card title="What is UrjaGrid?" icon={<Zap className="w-4 h-4" />}>
        <p className="text-sm text-slate-300 leading-relaxed">
          UrjaGrid is a scalable energy-grid intelligence platform designed to monitor electricity infrastructure,
          understand grid health, identify abnormal conditions, visualize power-loss patterns and provide data-driven insights.
          It brings together transformer data, alert management, and analytics into a single, centralized dashboard
          so operators can make informed decisions about grid maintenance and performance.
        </p>
      </Card>

      {/* What UrjaGrid Monitors */}
      <Card title="What UrjaGrid Monitors" subtitle="Key metrics tracked across the grid" icon={<Activity className="w-4 h-4" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {monitoringItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-3 p-3.5 bg-slate-800/40 rounded-lg border border-slate-800">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.label}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* How UrjaGrid Works */}
      <Card title="How UrjaGrid Works" subtitle="From raw data to decision support" icon={<Brain className="w-4 h-4" />}>
        <div className="flex flex-col lg:flex-row items-stretch gap-2 py-2">
          {flowSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center gap-2 flex-1 p-4 bg-slate-800/40 rounded-lg border border-slate-800 text-center">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">{step.label}</h4>
                  <p className="text-xs text-slate-400">{step.desc}</p>
                </div>
                {i < flowSteps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-slate-600 hidden lg:block flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          UrjaGrid is designed to integrate energy-grid data from multiple cities and regions, scaling from a single
          location to a nationwide monitoring network.
        </p>
      </Card>
    </div>
  );
}
