import { Eye, AlertTriangle, BarChart3, Map, Sparkles, Zap } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const features = [
  {
    icon: Eye,
    title: 'Grid Visibility',
    desc: 'Understand infrastructure status from a centralized dashboard. See the health, load, and operational state of every monitored transformer at a glance.',
    color: 'cyan',
  },
  {
    icon: AlertTriangle,
    title: 'Early Issue Detection',
    desc: 'Highlight abnormal conditions and faults requiring attention before they escalate into service disruptions.',
    color: 'amber',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Monitoring',
    desc: 'Convert raw grid information into meaningful visual insights with charts, trends, and severity-based alerting.',
    color: 'blue',
  },
  {
    icon: Map,
    title: 'Multi-City Scalability',
    desc: 'Designed to support multiple cities and future datasets. Add new locations and replace demo data with real sources as they become available.',
    color: 'green',
  },
  {
    icon: Sparkles,
    title: 'AI-Assisted Insights',
    desc: 'Summarize available data and identify important patterns automatically, helping operators focus on what matters most.',
    color: 'violet',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  green: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
};

export function WhyUrjaGridSection() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white">Why UrjaGrid?</h2>
        <p className="text-sm text-slate-500">What makes UrjaGrid different</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          const c = colorMap[feature.color];
          return (
            <div
              key={i}
              className={`p-5 bg-slate-900/60 border ${c.border} rounded-xl hover:border-opacity-40 transition-all duration-300 ${
                i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className={`p-3 rounded-xl ${c.bg} ${c.text} inline-flex mb-3`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1.5">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          );
        })}
      </div>

      <Card title="Built for Scale" icon={<Zap className="w-4 h-4" />}>
        <p className="text-sm text-slate-300 leading-relaxed">
          UrjaGrid's architecture is designed from the ground up for scalability. Each city's data is structured as
          an independent dataset that can be sourced from APIs, databases, CSV files, or live data feeds. This means
          new cities can be added and demo data can be replaced with real data without redesigning the platform.
        </p>
      </Card>
    </div>
  );
}
