import { CheckCircle2, AlertCircle, MapPin, Info } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cities } from '@/data';

export function DemonstrationSection() {
  const realCities = cities.filter((c) => c.isReal);
  const demoCities = cities.filter((c) => !c.isReal);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white">Current Demonstration</h2>
        <p className="text-sm text-slate-500">Understanding data availability across locations</p>
      </div>

      {/* Primary explanation */}
      <Card title="Data Availability" icon={<Info className="w-4 h-4" />}>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-slate-300 leading-relaxed">
            <span className="font-semibold text-white">Varanasi</span> is currently the primary data-enabled location in UrjaGrid.
            The Varanasi dashboard uses the provided Varanasi dataset with real operational metrics.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Other locations currently shown in the prototype use <span className="text-amber-400 font-medium">demo/sample data</span> and are included
            to demonstrate the future scalability of the platform. Demo data should not be interpreted as actual live grid conditions.
          </p>
        </div>
      </Card>

      {/* Real data locations */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Data Available
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {realCities.map((city) => (
            <div key={city.id} className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-white">{city.name}</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-medium">
                  Data Available
                </span>
              </div>
              <p className="text-xs text-slate-400">{city.state}</p>
              <p className="text-xs text-slate-500 mt-1.5">Uses the provided real dataset for monitoring and analysis.</p>
            </div>
          ))}
        </div>
      </div>

      {/* Demo data locations */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          Demo / Prototype
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {demoCities.map((city) => (
            <div key={city.id} className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400/70" />
                  <span className="text-sm font-semibold text-white">{city.name}</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full font-medium">
                  Demo / Prototype
                </span>
              </div>
              <p className="text-xs text-slate-400">{city.state}</p>
              <p className="text-xs text-slate-500 mt-1.5">Uses simulated data to demonstrate platform scalability. Not actual grid conditions.</p>
            </div>
          ))}
        </div>
      </div>

      <Card title="Important Note" icon={<Info className="w-4 h-4" />}>
        <p className="text-sm text-slate-400 leading-relaxed">
          Demo data is clearly labeled throughout the dashboard. When real data becomes available for a city,
          the demo dataset can be replaced without any changes to the dashboard structure or user interface.
          The architecture is designed to make this transition seamless.
        </p>
      </Card>
    </div>
  );
}
