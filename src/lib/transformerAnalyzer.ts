export interface TransformerInput {
  transformerId: string;
  ratedVoltage: number;
  ratedCurrent: number;
  measuredVoltage: number;
  measuredCurrent: number;
  temperature: number;
  powerLossPercent?: number;
}

export type ConditionLevel = 'normal' | 'warning' | 'critical';

export interface LoadResult {
  loadPercent: number;
  condition: ConditionLevel | 'overload';
}

export interface VoltageResult {
  deviationPercent: number;
  condition: ConditionLevel;
}

export interface TemperatureResult {
  temperature: number;
  condition: ConditionLevel;
}

export interface PowerResult {
  apparentPower: number;
}

export interface HealthScoreResult {
  total: number;
  loadScore: number;
  temperatureScore: number;
  voltageScore: number;
  powerLossScore: number;
}

export type OverallStatus = 'healthy' | 'warning' | 'critical';

export interface TransformerAlert {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium';
  message: string;
}

export interface TransformerAnalysis {
  input: TransformerInput;
  load: LoadResult;
  voltage: VoltageResult;
  temperature: TemperatureResult;
  power: PowerResult;
  healthScore: HealthScoreResult;
  status: OverallStatus;
  isOverloaded: boolean;
  alerts: TransformerAlert[];
  recommendation: string;
}

export function calculateLoadPercentage(measuredCurrent: number, ratedCurrent: number): number {
  if (ratedCurrent <= 0) return 0;
  return (measuredCurrent / ratedCurrent) * 100;
}

export function getLoadCondition(loadPercent: number): LoadResult['condition'] {
  if (loadPercent > 100) return 'overload';
  if (loadPercent > 80) return 'warning';
  return 'normal';
}

export function calculateVoltageDeviation(measuredVoltage: number, ratedVoltage: number): number {
  if (ratedVoltage <= 0) return 0;
  return (Math.abs(measuredVoltage - ratedVoltage) / ratedVoltage) * 100;
}

export function getVoltageCondition(deviationPercent: number): ConditionLevel {
  if (deviationPercent > 10) return 'critical';
  if (deviationPercent > 5) return 'warning';
  return 'normal';
}

export function getTemperatureCondition(temperature: number): ConditionLevel {
  if (temperature > 75) return 'critical';
  if (temperature >= 60) return 'warning';
  return 'normal';
}

export function calculatePower(measuredVoltage: number, measuredCurrent: number): number {
  return measuredVoltage * measuredCurrent;
}

export function calculateHealthScore(input: TransformerInput, load: LoadResult, voltage: VoltageResult, temperature: TemperatureResult): HealthScoreResult {
  let loadScore: number;
  if (load.condition === 'normal') loadScore = 30;
  else if (load.condition === 'warning') loadScore = 20;
  else loadScore = 0;

  let temperatureScore: number;
  if (temperature.condition === 'normal') temperatureScore = 30;
  else if (temperature.condition === 'warning') temperatureScore = 18;
  else temperatureScore = 0;

  let voltageScore: number;
  if (voltage.condition === 'normal') voltageScore = 25;
  else if (voltage.condition === 'warning') voltageScore = 15;
  else voltageScore = 0;

  let powerLossScore: number;
  const loss = input.powerLossPercent ?? 0;
  if (loss <= 5) powerLossScore = 15;
  else if (loss <= 10) powerLossScore = 8;
  else powerLossScore = 0;

  return {
    loadScore,
    temperatureScore,
    voltageScore,
    powerLossScore,
    total: loadScore + temperatureScore + voltageScore + powerLossScore,
  };
}

export function determineTransformerStatus(
  healthScore: number,
  temperature: TemperatureResult,
  voltage: VoltageResult,
  isOverloaded: boolean,
): OverallStatus {
  if (
    healthScore < 50 ||
    temperature.condition === 'critical' ||
    voltage.condition === 'critical'
  ) {
    return 'critical';
  }
  if (healthScore < 80 || isOverloaded) {
    return 'warning';
  }
  return 'healthy';
}

export function generateTransformerAlerts(
  load: LoadResult,
  voltage: VoltageResult,
  temperature: TemperatureResult,
  input: TransformerInput,
): TransformerAlert[] {
  const alerts: TransformerAlert[] = [];

  if (load.condition === 'overload') {
    alerts.push({
      id: 'alert-overload',
      title: 'OVERLOAD DETECTED',
      severity: 'critical',
      message: `Transformer current (${input.measuredCurrent} A) exceeds the configured demo rating (${input.ratedCurrent} A). Load is at ${load.loadPercent.toFixed(1)}%.`,
    });
  }

  if (temperature.condition === 'critical') {
    alerts.push({
      id: 'alert-temp-critical',
      title: 'HIGH TEMPERATURE',
      severity: 'critical',
      message: `Transformer temperature (${input.temperature}°C) has entered the critical demo range (>75°C). Immediate inspection recommended.`,
    });
  }

  if (voltage.condition === 'critical') {
    alerts.push({
      id: 'alert-voltage-critical',
      title: 'VOLTAGE ABNORMAL',
      severity: 'critical',
      message: `Measured voltage (${input.measuredVoltage} V) deviates ${voltage.deviationPercent.toFixed(1)}% from rated voltage (${input.ratedVoltage} V), exceeding the 10% critical threshold.`,
    });
  }

  if (load.condition === 'warning') {
    alerts.push({
      id: 'alert-load-warning',
      title: 'LOAD WARNING',
      severity: 'medium',
      message: `Transformer load is at ${load.loadPercent.toFixed(1)}%, within the 80–100% warning range.`,
    });
  }

  if (temperature.condition === 'warning') {
    alerts.push({
      id: 'alert-temp-warning',
      title: 'TEMPERATURE WARNING',
      severity: 'medium',
      message: `Transformer temperature (${input.temperature}°C) is in the 60–75°C warning range.`,
    });
  }

  if (voltage.condition === 'warning') {
    alerts.push({
      id: 'alert-voltage-warning',
      title: 'VOLTAGE DEVIATION WARNING',
      severity: 'medium',
      message: `Voltage deviation of ${voltage.deviationPercent.toFixed(1)}% exceeds the 5% warning threshold.`,
    });
  }

  const loss = input.powerLossPercent;
  if (loss !== undefined && loss > 5) {
    alerts.push({
      id: 'alert-loss',
      title: 'POWER LOSS WARNING',
      severity: loss > 10 ? 'critical' : 'medium',
      message: `Power loss at ${loss}% exceeds the 5% demo threshold.`,
    });
  }

  return alerts;
}

export function generateRecommendation(
  status: OverallStatus,
  isOverloaded: boolean,
  temperature: TemperatureResult,
  voltage: VoltageResult,
): string {
  if (status === 'critical') {
    return 'Immediate inspection recommended. Check temperature, loading and voltage conditions.';
  }
  if (isOverloaded) {
    return 'Reduce loading and inspect transformer operating conditions.';
  }
  if (status === 'warning') {
    const issues: string[] = [];
    if (temperature.condition === 'warning') issues.push('temperature');
    if (voltage.condition === 'warning') issues.push('voltage');
    return `Monitor transformer ${issues.join(' and ')} closely.`;
  }
  return 'Transformer operating within the configured demo limits. Continue monitoring.';
}

export function analyzeTransformer(input: TransformerInput): TransformerAnalysis {
  const loadPercent = calculateLoadPercentage(input.measuredCurrent, input.ratedCurrent);
  const loadCondition = getLoadCondition(loadPercent);
  const load: LoadResult = { loadPercent, condition: loadCondition };

  const deviationPercent = calculateVoltageDeviation(input.measuredVoltage, input.ratedVoltage);
  const voltage: VoltageResult = {
    deviationPercent,
    condition: getVoltageCondition(deviationPercent),
  };

  const temperature: TemperatureResult = {
    temperature: input.temperature,
    condition: getTemperatureCondition(input.temperature),
  };

  const power: PowerResult = {
    apparentPower: calculatePower(input.measuredVoltage, input.measuredCurrent),
  };

  const healthScore = calculateHealthScore(input, load, voltage, temperature);
  const isOverloaded = load.condition === 'overload';
  const status = determineTransformerStatus(healthScore.total, temperature, voltage, isOverloaded);
  const alerts = generateTransformerAlerts(load, voltage, temperature, input);
  const recommendation = generateRecommendation(status, isOverloaded, temperature, voltage);

  return {
    input,
    load,
    voltage,
    temperature,
    power,
    healthScore,
    status,
    isOverloaded,
    alerts,
    recommendation,
  };
}
