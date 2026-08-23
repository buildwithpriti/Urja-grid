import { Zap, LayoutDashboard, Box, AlertTriangle, TrendingDown, Activity, BarChart3, Sparkles, X, Info, HelpCircle, Database, Mail, Shield } from 'lucide-react';

export type NavSection =
  | 'overview' | 'transformers' | 'alerts' | 'power-loss' | 'grid-health' | 'analytics' | 'ai-insights'
  | 'about' | 'why-urjagrid' | 'demonstration' | 'data-methodology' | 'contact'
  | 'privacy' | 'terms' | 'data-disclaimer' | 'cookie-policy';

interface SidebarProps {
  active: NavSection;
  onNavigate: (section: NavSection) => void;
  isReal: boolean;
  mobileOpen: boolean;
  onClose: () => void;
}

const monitoringItems: { id: NavSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'transformers', label: 'Transformer Monitoring', icon: Box },
  { id: 'alerts', label: 'Alerts & Faults', icon: AlertTriangle },
  { id: 'power-loss', label: 'Power Loss Analysis', icon: TrendingDown },
  { id: 'grid-health', label: 'Grid Health', icon: Activity },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'ai-insights', label: 'AI Insights', icon: Sparkles },
];

const infoItems: { id: NavSection; label: string; icon: typeof Info }[] = [
  { id: 'about', label: 'About UrjaGrid', icon: Info },
  { id: 'why-urjagrid', label: 'Why UrjaGrid', icon: HelpCircle },
  { id: 'demonstration', label: 'Current Demonstration', icon: Zap },
  { id: 'data-methodology', label: 'Data & Methodology', icon: Database },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export function Sidebar({ active, onNavigate, isReal, mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800 z-50 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-cyan-400 blur-lg opacity-30" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">UrjaGrid</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Energy Intelligence</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold px-3 mb-2">Monitoring</p>
          <div className="flex flex-col gap-1">
            {monitoringItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : ''}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold px-3 mb-2 mt-5">Information</p>
          <div className="flex flex-col gap-1">
            {infoItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : ''}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="p-3 border-t border-slate-800">
          <div className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs ${isReal ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
            <span className={`w-2 h-2 rounded-full ${isReal ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
            <span className="font-medium">{isReal ? 'Live Data Connected' : 'Demo Data Mode'}</span>
          </div>
          <p className="text-[10px] text-slate-600 mt-2 px-3">v1.0.0 · Updated 2026</p>
        </div>
      </aside>
    </>
  );
}
