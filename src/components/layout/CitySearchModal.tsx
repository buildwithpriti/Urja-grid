import { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin, CheckCircle2, AlertCircle, ArrowRight, Database, Clock, Zap } from 'lucide-react';
import { searchCities } from '@/data';
import type { SearchableCity, CityId } from '@/data';

interface CitySearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelectCity: (id: CityId) => void;
  currentCityId: CityId;
}

type SearchState = 'initial' | 'no-query' | 'results' | 'no-match';

export function CitySearchModal({ open, onClose, onSelectCity, currentCityId }: CitySearchModalProps) {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setHasSearched(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const results = searchCities(query);
  const trimmed = query.trim();

  let state: SearchState = 'initial';
  if (!trimmed) {
    state = 'initial';
  } else if (results.length === 0) {
    state = 'no-match';
  } else {
    state = 'results';
  }

  const handleSelect = (city: SearchableCity) => {
    if (city.dataStatus === 'available' && (city.id === 'varanasi' || city.id === 'lucknow' || city.id === 'delhi' || city.id === 'mumbai' || city.id === 'prayagraj')) {
      onSelectCity(city.id as CityId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[8vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden animate-[modalSlide_0.25s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Explore Another City</h2>
              <p className="text-[11px] text-slate-500">Search for any city to view its grid data</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="px-5 py-4 border-b border-slate-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHasSearched(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && results.length > 0) {
                  handleSelect(results[0]);
                }
              }}
              placeholder="Search for a city..."
              className="w-full pl-10 pr-10 py-3 text-sm bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setHasSearched(false);
                  inputRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-500 hover:text-slate-300 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto px-5 py-4">
          {state === 'initial' && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="p-3 rounded-full bg-slate-800/50 mb-3">
                <Search className="w-6 h-6 text-slate-500" />
              </div>
              <p className="text-sm text-slate-400">Start typing a city name to search</p>
              <p className="text-xs text-slate-600 mt-1">Try: Kanpur, Jaipur, Bengaluru, Pune...</p>
            </div>
          )}

          {state === 'no-match' && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="p-3 rounded-full bg-slate-800/50 mb-3">
                <AlertCircle className="w-6 h-6 text-slate-500" />
              </div>
              <p className="text-sm font-medium text-slate-300">No matching location found</p>
              <p className="text-xs text-slate-500 mt-1">
                No city matches "{trimmed}". Try a different search term.
              </p>
            </div>
          )}

          {state === 'results' && (
            <div className="flex flex-col gap-2">
              {results.map((city) => (
                <ResultCard
                  key={city.id}
                  city={city}
                  isCurrent={city.id === currentCityId}
                  onSelect={() => handleSelect(city)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/40">
          <p className="text-[11px] text-slate-600 text-center">
            Cities with demo data use simulated values. Only "Data Available" cities have connected datasets.
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ city, isCurrent, onSelect }: { city: SearchableCity; isCurrent: boolean; onSelect: () => void }) {
  const isAvailable = city.dataStatus === 'available';
  const isProvided = city.datasetType === 'provided';
  const canOpen = isAvailable && !isCurrent;

  return (
    <div
      className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
        isCurrent
          ? 'bg-cyan-500/5 border-cyan-500/20'
          : canOpen
          ? 'bg-slate-800/40 border-slate-700/50 hover:border-cyan-500/30 hover:bg-slate-800/60 cursor-pointer'
          : 'bg-slate-800/30 border-slate-800'
      }`}
      onClick={canOpen ? onSelect : undefined}
      role={canOpen ? 'button' : undefined}
    >
      <div className={`p-2.5 rounded-lg flex-shrink-0 ${isAvailable ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-700/30 text-slate-500'}`}>
        <MapPin className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-white truncate">{city.name}</h4>
          {isCurrent && (
            <span className="text-[10px] text-cyan-400 font-medium px-1.5 py-0.5 bg-cyan-500/10 rounded">Current</span>
          )}
        </div>
        <p className="text-xs text-slate-500">{city.state}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {isAvailable ? (
          <div className="flex flex-col items-end gap-0.5">
            <span className={`flex items-center gap-1 text-[10px] font-medium ${isProvided ? 'text-emerald-400' : 'text-amber-400'}`}>
              {isProvided ? (
                <>
                  <CheckCircle2 className="w-3 h-3" /> Data Available
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3" /> Demo / Prototype
                </>
              )}
            </span>
            {city.lastUpdated && (
              <span className="flex items-center gap-1 text-[10px] text-slate-600">
                <Clock className="w-2.5 h-2.5" /> {city.lastUpdated}
              </span>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-end gap-0.5">
            <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
              <Database className="w-3 h-3" /> Unavailable
            </span>
          </div>
        )}

        {canOpen && (
          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
        )}
      </div>
    </div>
  );
}

// For unavailable cities, show a detail card inline
