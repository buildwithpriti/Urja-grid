import { Database, BarChart3, CheckCircle2, AlertCircle, Clock, Cloud, Info } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const dataTypes = [
  { label: 'Transformer counts', desc: 'Total, active, inactive, overloaded and faulty transformer counts' },
  { label: 'Health metrics', desc: 'Average health scores and health distribution across the grid' },
  { label: 'Alert data', desc: 'Alert severity levels from critical to low, with status tracking' },
  { label: 'Power loss', desc: 'Area-wise power loss percentages and abnormal loss detection' },
  { label: 'Uptime & trends', desc: 'Grid uptime percentages and weekly/monthly trend data' },
  { label: 'Substation details', desc: 'Load, voltage, power flow and fault counts per substation' },
];

export function DataMethodologySection() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white">Data & Methodology</h2>
        <p className="text-sm text-slate-500">How UrjaGrid organizes and presents grid information</p>
      </div>

      <Card title="What Type of Grid Information UrjaGrid Displays" icon={<Database className="w-4 h-4" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dataTypes.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-lg border border-slate-800">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 flex-shrink-0">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{item.label}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="How Metrics Are Organized" icon={<BarChart3 className="w-4 h-4" />}>
        <p className="text-sm text-slate-300 leading-relaxed">
          Grid metrics are organized into a structured dataset per city. Each dataset contains aggregate grid-level
          statistics (totals, averages, uptime), substation-level details (load, health, power flow), alert records
          with severity and status, and time-series trend data for weekly and monthly analysis. This structure allows
          the dashboard to present data at multiple levels of granularity — from a city-wide overview down to
          individual substation performance.
        </p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Real Provided Data vs. Demo Data" icon={<Info className="w-4 h-4" />}>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Real Data (Varanasi)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  The Varanasi dataset uses provided operational metrics. These values represent actual grid conditions
                  and should be treated as real monitoring data.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-500/5 border border-amber-500/15 rounded-lg">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Demo Data (Other Cities)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Other city views use simulated values generated to demonstrate the platform's structure and scalability.
                  These are clearly labeled and should not be interpreted as actual grid conditions.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Importance of Data Freshness" icon={<Clock className="w-4 h-4" />}>
          <p className="text-sm text-slate-300 leading-relaxed">
            Grid monitoring is most effective when data is current. The accuracy of health scores, alert detection, and
            power-loss analysis depends on how recently the underlying data was collected. Stale data may not reflect
            real-time grid conditions, and decisions based on outdated information should be made with that limitation
            in mind. UrjaGrid is designed to support live data integration for maximum freshness.
          </p>
        </Card>
      </div>

      <Card title="Future API & Database Integration" icon={<Cloud className="w-4 h-4" />}>
        <p className="text-sm text-slate-300 leading-relaxed">
          UrjaGrid's data layer is structured to support future integration with external data sources. The current
          architecture separates data definitions from the dashboard UI, meaning datasets can be sourced from APIs,
          databases, CSV imports, or live data feeds without redesigning the interface. As real data sources become
          available for additional cities, they can be connected directly to the existing data layer.
        </p>
        <p className="text-xs text-slate-500 mt-3">
          Note: UrjaGrid does not currently claim integration with any specific government department, electricity board,
          or external data provider. Such connections would be established and documented as they are implemented.
        </p>
      </Card>
    </div>
  );
}
