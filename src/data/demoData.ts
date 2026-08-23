import type { CityDataset, CityId, Substation, Alert, TrendPoint } from './types';
import { cityMap } from './cities';
import { varanasiData } from './varanasi';

const areaNames: Record<CityId, string[]> = {
  varanasi: [],
  lucknow: ['Gomti Nagar', 'Hazratganj', 'Alambagh', 'Indira Nagar', 'Chowk', 'Aminabad', 'Vikas Nagar', 'Rajajipuram'],
  delhi: ['Connaught Place', 'Karol Bagh', 'Lajpat Nagar', 'Rohini', 'Dwarka', 'Saket', 'Pitampura', 'Mayur Vihar'],
  mumbai: ['Andheri', 'Bandra', 'Dadar', 'Worli', 'Goregaon', 'Borivali', 'Vile Parle', 'Kandivali'],
  prayagraj: ['Civil Lines', 'Katra', 'Allahpur', 'MNNIT', 'Jhunsi', 'Phaphamau', 'Naini', 'Tagore Town'],
};

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function statusFromScore(score: number): 'healthy' | 'warning' | 'critical' {
  if (score >= 80) return 'healthy';
  if (score >= 65) return 'warning';
  return 'critical';
}

function makeSubstations(cityId: CityId, count: number, rand: () => number): Substation[] {
  const areas = areaNames[cityId];
  return Array.from({ length: count }, (_, i) => {
    const load = Math.round(55 + rand() * 45);
    const health = Math.round(55 + rand() * 42);
    return {
      id: `${cityId.slice(0, 3).toUpperCase()}-SS-${String(i + 1).padStart(2, '0')}`,
      name: `${areas[i % areas.length]} Substation`,
      area: areas[i % areas.length],
      loadPercent: load,
      healthScore: health,
      status: statusFromScore(health),
      voltageKV: rand() > 0.5 ? 33 : 11,
      powerFlowMW: Math.round((8 + rand() * 18) * 10) / 10,
      powerLossPercent: Math.round((1 + rand() * 5) * 10) / 10,
      transformers: Math.round(800 + rand() * 1200),
      faultCount: Math.round(rand() * 60),
    };
  });
}

function makeAlerts(cityId: CityId, rand: () => number): Alert[] {
  const areas = areaNames[cityId];
  const severities: Alert['severity'][] = ['critical', 'high', 'medium', 'low'];
  const titles = ['Transformer Overload', 'Voltage Fluctuation', 'Abnormal Power Loss', 'Oil Temperature High', 'Partial Discharge', 'Load Imbalance', 'Faulty Tap Changer', 'Communication Timeout'];
  const statuses: Alert['status'][] = ['open', 'acknowledged', 'resolved'];
  return Array.from({ length: 10 }, (_, i) => {
    const sev = severities[Math.floor(rand() * 4)];
    const area = areas[Math.floor(rand() * areas.length)];
    return {
      id: `${cityId.slice(0, 3).toUpperCase()}-ALT-${String(i + 1).padStart(3, '0')}`,
      title: titles[Math.floor(rand() * titles.length)],
      severity: sev,
      transformerId: `${cityId.slice(0, 3).toUpperCase()}-TR-${Math.floor(rand() * 9000 + 1000)}`,
      area,
      message: 'Demo alert generated from simulated grid telemetry. Replace with live data when available.',
      timestamp: `2026-08-${String(14 - Math.floor(rand() * 3)).padStart(2, '0')} ${String(Math.floor(rand() * 24)).padStart(2, '0')}:${String(Math.floor(rand() * 60)).padStart(2, '0')}`,
      status: i < 6 ? 'open' : statuses[Math.floor(rand() * 3)],
    };
  });
}

function makeTrend(rand: () => number, labels: string[]): TrendPoint[] {
  return labels.map((label) => ({
    label,
    uptime: Math.round((98.5 + rand() * 1.2) * 10) / 10,
    load: Math.round(70 + rand() * 22),
    faults: Math.round(20 + rand() * 35),
    powerLoss: Math.round((2 + rand() * 2.5) * 10) / 10,
  }));
}

export function generateDemoData(cityId: CityId): CityDataset {
  const city = cityMap[cityId];
  const rand = seededRandom(cityId.length * 1000 + cityId.charCodeAt(0) * 7);

  const total = Math.round(15000 + rand() * 12000);
  const inactive = Math.round(total * (0.02 + rand() * 0.02));
  const active = total - inactive;
  const overloaded = Math.round(total * (0.025 + rand() * 0.015));
  const faultDetected = Math.round(total * (0.008 + rand() * 0.006));
  const abnormalPowerLoss = Math.round(total * (0.03 + rand() * 0.02));
  const healthScore = Math.round(78 + rand() * 14);
  const uptime = Math.round((98.5 + rand() * 1.3) * 10) / 10;
  const totalAlerts = Math.round(800 + rand() * 600);
  const critical = Math.round(totalAlerts * (0.05 + rand() * 0.04));
  const high = Math.round(totalAlerts * (0.18 + rand() * 0.06));
  const medium = Math.round(totalAlerts * (0.38 + rand() * 0.06));
  const low = totalAlerts - critical - high - medium;

  const healthyCount = Math.round(total * (0.82 + rand() * 0.05));
  const warningCount = Math.round(total * (0.08 + rand() * 0.04));
  const criticalCount = total - healthyCount - warningCount;

  const substations = makeSubstations(cityId, 10, rand);
  const alerts = makeAlerts(cityId, rand);
  const weeklyTrend = makeTrend(rand, ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  const monthlyTrend = makeTrend(rand, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']);

  const lossByArea = substations
    .map((s) => ({ area: s.area, lossPercent: s.powerLossPercent, transformers: s.transformers }))
    .sort((a, b) => b.lossPercent - a.lossPercent);

  return {
    city,
    grid: {
      totalTransformers: total,
      activeTransformers: active,
      inactiveTransformers: inactive,
      overloadedTransformers: overloaded,
      faultDetected,
      abnormalPowerLoss,
      averageHealthScore: healthScore,
      gridUptime: uptime,
      totalOpenAlerts: totalAlerts,
      criticalAlerts: critical,
      highAlerts: high,
      mediumAlerts: medium,
      lowAlerts: low,
    },
    substations,
    alerts,
    weeklyTrend,
    monthlyTrend,
    healthDistribution: [
      { label: 'Healthy', value: healthyCount, status: 'healthy' },
      { label: 'Warning', value: warningCount, status: 'warning' },
      { label: 'Critical', value: criticalCount, status: 'critical' },
    ],
    lossByArea,
  };
}

export function getCityData(cityId: CityId): CityDataset {
  if (cityId === 'varanasi') {
    return varanasiData;
  }
  return generateDemoData(cityId);
}
