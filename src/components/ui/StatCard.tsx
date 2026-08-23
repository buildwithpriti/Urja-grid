import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  accent?: 'cyan' | 'green' | 'amber' | 'red' | 'blue' | 'violet';
  sublabel?: string;
  trend?: string;
}

const accentClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20', glow: 'shadow-cyan-500/10' },
  green: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', glow: 'shadow-emerald-500/10' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', glow: 'shadow-amber-500/10' },
  red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', glow: 'shadow-red-500/10' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', glow: 'shadow-blue-500/10' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20', glow: 'shadow-violet-500/10' },
};

export function StatCard({ label, value, icon, accent = 'cyan', sublabel, trend }: StatCardProps) {
  const a = accentClasses[accent];
  return (
    <div
      className={`relative bg-slate-900/60 backdrop-blur-sm border ${a.border} rounded-xl p-4 overflow-hidden group hover:border-opacity-40 transition-all duration-300`}
    >
      <div className={`absolute -top-8 -right-8 w-24 h-24 ${a.bg} rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity`} />
      <div className="relative flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-400 font-medium">{label}</span>
          <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
          {sublabel && <span className="text-xs text-slate-500">{sublabel}</span>}
          {trend && <span className={`text-xs font-medium ${a.text}`}>{trend}</span>}
        </div>
        <div className={`p-2.5 rounded-lg ${a.bg} ${a.text}`}>{icon}</div>
      </div>
    </div>
  );
}
