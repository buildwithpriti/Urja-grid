import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function Card({ children, className = '', title, subtitle, icon, action }: CardProps) {
  return (
    <div
      className={`bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl p-5 ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            {icon && <span className="text-cyan-400">{icon}</span>}
            <div>
              {title && <h3 className="text-sm font-semibold text-white">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
