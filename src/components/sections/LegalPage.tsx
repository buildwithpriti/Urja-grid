import type { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';

interface LegalPageProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
}

export function LegalPage({ title, subtitle, icon, children }: LegalPageProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      <Card icon={icon}>
        <div className="flex flex-col gap-4">
          {children}
        </div>
      </Card>
    </div>
  );
}

interface LegalSectionProps {
  heading: string;
  children: ReactNode;
}

export function LegalSection({ heading, children }: LegalSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white mb-1.5">{heading}</h3>
      <div className="text-sm text-slate-400 leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}
