import type { SearchableCity } from './types';

export const searchableCities: SearchableCity[] = [
  { id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', dataStatus: 'available', datasetType: 'provided', lastUpdated: '2026-08-15' },
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', dataStatus: 'available', datasetType: 'demo' },
  { id: 'delhi', name: 'Delhi', state: 'Delhi NCR', dataStatus: 'available', datasetType: 'demo' },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', dataStatus: 'available', datasetType: 'demo' },
  { id: 'prayagraj', name: 'Prayagraj', state: 'Uttar Pradesh', dataStatus: 'available', datasetType: 'demo' },

  { id: 'kanpur', name: 'Kanpur', state: 'Uttar Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'agra', name: 'Agra', state: 'Uttar Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'surat', name: 'Surat', state: 'Gujarat', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'nagpur', name: 'Nagpur', state: 'Maharashtra', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'indore', name: 'Indore', state: 'Madhya Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'patna', name: 'Patna', state: 'Bihar', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'ranchi', name: 'Ranchi', state: 'Jharkhand', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'lucknow2', name: 'Ludhiana', state: 'Punjab', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'amritsar', name: 'Amritsar', state: 'Punjab', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'chandigarh', name: 'Chandigarh', state: 'Chandigarh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'dehradun', name: 'Dehradun', state: 'Uttarakhand', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'shimla', name: 'Shimla', state: 'Himachal Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'raipur', name: 'Raipur', state: 'Chhattisgarh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'bhubaneswar', name: 'Bhubaneswar', state: 'Odisha', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'guwahati', name: 'Guwahati', state: 'Assam', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', state: 'Kerala', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'kochi', name: 'Kochi', state: 'Kerala', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'madurai', name: 'Madurai', state: 'Tamil Nadu', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'vijayawada', name: 'Vijayawada', state: 'Andhra Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'mysuru', name: 'Mysuru', state: 'Karnataka', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'nashik', name: 'Nashik', state: 'Maharashtra', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'aurangabad', name: 'Aurangabad', state: 'Maharashtra', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'vadodara', name: 'Vadodara', state: 'Gujarat', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'rajkot', name: 'Rajkot', state: 'Gujarat', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'jhansi', name: 'Jhansi', state: 'Uttar Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'meerut', name: 'Meerut', state: 'Uttar Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'gorakhpur', name: 'Gorakhpur', state: 'Uttar Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'bareilly', name: 'Bareilly', state: 'Uttar Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'aligarh', name: 'Aligarh', state: 'Uttar Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'moradabad', name: 'Moradabad', state: 'Uttar Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'saharanpur', name: 'Saharanpur', state: 'Uttar Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
  { id: 'firozabad', name: 'Firozabad', state: 'Uttar Pradesh', dataStatus: 'unavailable', datasetType: 'demo' },
];

export function searchCities(query: string): SearchableCity[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchableCities.filter(
    (c) => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)
  );
}
