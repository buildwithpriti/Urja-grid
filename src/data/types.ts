export type CityId = 'varanasi' | 'lucknow' | 'delhi' | 'mumbai' | 'prayagraj';

export type DataStatus = 'available' | 'unavailable';
export type DatasetType = 'provided' | 'demo';

export interface City {
  id: CityId;
  name: string;
  state: string;
  isReal: boolean;
  dataStatus: DataStatus;
  datasetType: DatasetType;
  lastUpdated?: string;
}

export interface SearchableCity {
  id: string;
  name: string;
  state: string;
  dataStatus: DataStatus;
  datasetType: DatasetType;
  lastUpdated?: string;
}

export interface GridData {
  totalTransformers: number;
  activeTransformers: number;
  inactiveTransformers: number;
  overloadedTransformers: number;
  faultDetected: number;
  abnormalPowerLoss: number;
  averageHealthScore: number;
  gridUptime: number;
  totalOpenAlerts: number;
  criticalAlerts: number;
  highAlerts: number;
  mediumAlerts: number;
  lowAlerts: number;
}

export interface Substation {
  id: string;
  name: string;
  area: string;
  loadPercent: number;
  healthScore: number;
  status: 'healthy' | 'warning' | 'critical';
  voltageKV: number;
  powerFlowMW: number;
  powerLossPercent: number;
  transformers: number;
  faultCount: number;
}

export interface Alert {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  transformerId: string;
  area: string;
  message: string;
  timestamp: string;
  status: 'open' | 'acknowledged' | 'resolved';
}

export interface TrendPoint {
  label: string;
  uptime: number;
  load: number;
  faults: number;
  powerLoss: number;
}

export interface CityDataset {
  city: City;
  grid: GridData;
  substations: Substation[];
  alerts: Alert[];
  weeklyTrend: TrendPoint[];
  monthlyTrend: TrendPoint[];
  healthDistribution: { label: string; value: number; status: 'healthy' | 'warning' | 'critical' }[];
  lossByArea: { area: string; lossPercent: number; transformers: number }[];
}
