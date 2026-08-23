import { useState } from 'react';
import { MapPin, ChevronDown, Menu, Clock, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { cities } from '@/data';
import type { CityId } from '@/data';
import { CitySearchModal } from '@/components/layout/CitySearchModal';

interface TopBarProps {
  selectedCity: CityId;
  onCityChange: (id: CityId) => void;
  onMenuClick: () => void;
  isReal: boolean;
}

export function TopBar({ selectedCity, onCityChange, onMenuClick, isReal }: TopBarProps) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const current = cities.find((c) => c.id === selectedCity)!;

  return (
    <>
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          <div className="flex items-center gap-3">
            <button onClick={onMenuClick} className="lg:hidden text-slate-400 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2.5 px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                <div className="text-left">
                  <span className="block text-sm font-semibold text-white">{current.name}</span>
                  <span className="block text-[10px] text-slate-500">{current.state}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                  <div className="absolute top-full mt-2 left-0 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                    <p className="px-3 py-2 text-[10px] text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-800">
                      Select City
                    </p>
                    {cities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => {
                          onCityChange(city.id);
                          setOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-800/50 transition-colors ${
                          city.id === selectedCity ? 'bg-cyan-500/5' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <MapPin className={`w-4 h-4 ${city.id === selectedCity ? 'text-cyan-400' : 'text-slate-500'}`} />
                          <div className="text-left">
                            <span className="block text-sm font-medium text-white">{city.name}</span>
                            <span className="block text-[10px] text-slate-500">{city.state}</span>
                          </div>
                        </div>
                        {city.isReal ? (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                            <CheckCircle2 className="w-3 h-3" /> Data Available
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] text-amber-400/70 font-medium">
                            <AlertCircle className="w-3 h-3" /> Demo
                          </span>
                        )}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setOpen(false);
                        setSearchOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-3 border-t border-slate-800 bg-slate-950/50 hover:bg-cyan-500/5 transition-colors group"
                    >
                      <Plus className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-90 transition-transform duration-300" />
                      <span className="text-xs text-cyan-400 font-medium">More locations</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>Aug 15, 2026 · 09:00 IST</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${isReal ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
              <span className={`w-2 h-2 rounded-full ${isReal ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
              {isReal ? 'Real Data' : 'Demo Data'}
            </div>
          </div>
        </div>
      </header>

      <CitySearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectCity={onCityChange}
        currentCityId={selectedCity}
      />
    </>
  );
}
