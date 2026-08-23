import type { City, CityId } from './types';

export const cities: City[] = [
  { id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', isReal: true, dataStatus: 'available', datasetType: 'provided', lastUpdated: '2026-08-15' },
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', isReal: false, dataStatus: 'available', datasetType: 'demo' },
  { id: 'delhi', name: 'Delhi', state: 'Delhi NCR', isReal: false, dataStatus: 'available', datasetType: 'demo' },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', isReal: false, dataStatus: 'available', datasetType: 'demo' },
  { id: 'prayagraj', name: 'Prayagraj', state: 'Uttar Pradesh', isReal: false, dataStatus: 'available', datasetType: 'demo' },
];

export const cityMap: Record<CityId, City> = Object.fromEntries(
  cities.map((c) => [c.id, c])
) as Record<CityId, City>;
