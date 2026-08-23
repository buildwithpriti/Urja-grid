import { Zap, ChevronRight } from 'lucide-react';
import type { NavSection } from '@/components/layout/Sidebar';

interface FooterProps {
  onNavigate: (section: NavSection) => void;
}

const platformLinks: { id: NavSection; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'transformers', label: 'Transformer Monitoring' },
  { id: 'alerts', label: 'Alerts & Faults' },
  { id: 'power-loss', label: 'Power Loss Analysis' },
  { id: 'grid-health', label: 'Grid Health' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'ai-insights', label: 'AI Insights' },
];

const infoLinks: { id: NavSection; label: string }[] = [
  { id: 'about', label: 'About UrjaGrid' },
  { id: 'demonstration', label: 'How It Works' },
  { id: 'data-methodology', label: 'Data & Methodology' },
  { id: 'contact', label: 'Contact' },
];

const legalLinks: { id: NavSection; label: string }[] = [
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms & Conditions' },
  { id: 'data-disclaimer', label: 'Data Disclaimer' },
  { id: 'cookie-policy', label: 'Cookie Policy' },
];

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-8 border-t border-slate-800 bg-slate-950">
      <div className="px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" fill="white" />
                </div>
                <div className="absolute inset-0 rounded-lg bg-cyan-400 blur-lg opacity-20" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">UrjaGrid</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Energy Intelligence for a Smarter Grid</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              UrjaGrid is a scalable energy-grid monitoring and intelligence platform designed to transform grid
              data into meaningful insights.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Platform</h4>
            <ul className="flex flex-col gap-2">
              {platformLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="flex items-center gap-1 text-sm text-slate-400 hover:text-cyan-400 transition-colors text-left"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Information</h4>
            <ul className="flex flex-col gap-2">
              {infoLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Legal</h4>
            <ul className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-500">
            &copy; 2026 UrjaGrid. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built for energy-grid monitoring, analytics and decision support.
          </p>
        </div>
      </div>
    </footer>
  );
}
