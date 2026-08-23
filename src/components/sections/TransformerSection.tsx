import { useState } from 'react';
import {
  Box, Search, Filter, Activity, Zap, AlertTriangle, TrendingDown,
  Gauge, Thermometer, ArrowRight, RotateCcw, Beaker, CheckCircle2,
  AlertCircle, Lightbulb, Eye, Radio,
} from 'lucide-react';
import type { CityDataset, Substation } from '@/data';
import { formatNumber, formatPercent } from '@/lib/format';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/charts/ProgressBar';
import { RadialGauge } from '@/components/charts/RadialGauge';
import { DonutChart, DonutLegend } from '@/components/charts/DonutChart';
import {
  analyzeTransformer, type TransformerInput, type TransformerAnalysis, type ConditionLevel,
} from '@/lib/transformerAnalyzer';

interface Props { dataset: CityDataset; }

const defaultInput: TransformerInput = {
  transformerId: 'VNS-TR-001',
  ratedVoltage: 230,
  ratedCurrent: 1,
  measuredVoltage: 230,
  measuredCurrent: 0.8,
  temperature: 42,
  powerLossPercent: 3,
};

const scenarios: { label: string; values: TransformerInput }[] = [
  {
    label: 'Normal',
    values: { transformerId: 'VNS-TR-001', ratedVoltage: 230, ratedCurrent: 1, measuredVoltage: 230, measuredCurrent: 0.7, temperature: 40, powerLossPercent: 3 },
  },
  {
    label: 'Warning',
    values: { transformerId: 'VNS-TR-002', ratedVoltage: 230, ratedCurrent: 1, measuredVoltage: 220, measuredCurrent: 0.9, temperature: 65, powerLossPercent: 7 },
  },
  {
    label: 'Overload',
    values: { transformerId: 'VNS-TR-003', ratedVoltage: 230, ratedCurrent: 1, measuredVoltage: 230, measuredCurrent: 1.2, temperature: 65, powerLossPercent: 7 },
  },
  {
    label: 'Critical',
    values: { transformerId: 'VNS-TR-004', ratedVoltage: 230, ratedCurrent: 1, measuredVoltage: 200, measuredCurrent: 1.3, temperature: 80, powerLossPercent: 12 },
  },
];

interface FieldErrors {
  transformerId?: string;
  ratedVoltage?: string;
  ratedCurrent?: string;
  measuredVoltage?: string;
  measuredCurrent?: string;
  temperature?: string;
}

function validateInput(input: TransformerInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.transformerId.trim()) errors.transformerId = 'Transformer ID is required';
  if (input.ratedVoltage <= 0) errors.ratedVoltage = 'Must be greater than 0';
  if (input.ratedCurrent <= 0) errors.ratedCurrent = 'Must be greater than 0';
  if (input.measuredVoltage < 0) errors.measuredVoltage = 'Cannot be negative';
  if (input.measuredCurrent < 0) errors.measuredCurrent = 'Cannot be negative';
  if (isNaN(input.temperature)) errors.temperature = 'Enter a valid number';
  return errors;
}

function conditionLabel(cond: ConditionLevel | 'overload'): string {
  switch (cond) {
    case 'normal': return 'Normal';
    case 'warning': return 'Warning';
    case 'critical': return 'Critical';
    case 'overload': return 'Overload';
  }
}

function conditionColor(cond: ConditionLevel | 'overload'): string {
  switch (cond) {
    case 'normal': return 'text-emerald-400';
    case 'warning': return 'text-amber-400';
    case 'critical': return 'text-red-400';
    case 'overload': return 'text-orange-400';
  }
}

function statusBadgeClass(status: TransformerAnalysis['status']): string {
  switch (status) {
    case 'healthy': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'warning': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'critical': return 'bg-red-500/10 text-red-400 border-red-500/20';
  }
}

function statusIcon(status: TransformerAnalysis['status']) {
  switch (status) {
    case 'healthy': return <CheckCircle2 className="w-5 h-5" />;
    case 'warning': return <AlertTriangle className="w-5 h-5" />;
    case 'critical': return <AlertCircle className="w-5 h-5" />;
  }
}

export function TransformerSection({ dataset }: Props) {
  const { grid, substations, city } = dataset;

  // Existing substation directory state
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'healthy' | 'warning' | 'critical'>('all');

  // Health Analyzer state
  const [input, setInput] = useState<TransformerInput>(defaultInput);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [analysis, setAnalysis] = useState<TransformerAnalysis | null>(null);

  const updateField = (field: keyof TransformerInput, value: string | number | undefined) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnalyze = () => {
    const validation = validateInput(input);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    setAnalysis(analyzeTransformer(input));
  };

  const handleReset = () => {
    setInput(defaultInput);
    setErrors({});
    setAnalysis(null);
  };

  const applyScenario = (values: TransformerInput) => {
    setInput(values);
    setErrors({});
    setAnalysis(null);
  };

  // Existing substation directory computations
  const filtered = substations.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.area.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    healthy: substations.filter((s) => s.status === 'healthy').length,
    warning: substations.filter((s) => s.status === 'warning').length,
    critical: substations.filter((s) => s.status === 'critical').length,
  };

  const loadDistribution = [
    { label: 'Healthy', value: grid.activeTransformers - grid.overloadedTransformers - grid.faultDetected, color: '#22c55e' },
    { label: 'Overloaded', value: grid.overloadedTransformers, color: '#f59e0b' },
    { label: 'Faulty', value: grid.faultDetected, color: '#ef4444' },
    { label: 'Inactive', value: grid.inactiveTransformers, color: '#475569' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-2xl font-bold text-white">Transformer Monitoring</h2>
          <span className="px-2.5 py-0.5 text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full font-medium flex items-center gap-1">
            <Beaker className="w-3 h-3" /> DEMO MODE — Manual Input
          </span>
        </div>
        <p className="text-sm text-slate-500">Substation-level transformer data and individual transformer health analysis for {city.name}</p>
        <p className="text-xs text-slate-600 mt-1">Monitor transformer availability, loading conditions and detected faults. Use the Health Analyzer below to evaluate an individual transformer.</p>
      </div>

      {/* Existing grid-level stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total Transformers" value={formatNumber(grid.totalTransformers)} icon={<Box className="w-5 h-5" />} accent="cyan" />
        <StatCard label="Active" value={formatNumber(grid.activeTransformers)} icon={<Activity className="w-5 h-5" />} accent="green" />
        <StatCard label="Overloaded" value={formatNumber(grid.overloadedTransformers)} icon={<AlertTriangle className="w-5 h-5" />} accent="amber" />
        <StatCard label="Faulty" value={formatNumber(grid.faultDetected)} icon={<Zap className="w-5 h-5" />} accent="red" />
      </div>

      {/* ===== Transformer Health Analyzer ===== */}
      <Card title="Transformer Health Analyzer" subtitle="Enter transformer operating parameters to evaluate health, loading and risk conditions." icon={<Gauge className="w-4 h-4" />}>
        {/* Input fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Transformer ID"
            value={input.transformerId}
            onChange={(v) => updateField('transformerId', v)}
            error={errors.transformerId}
            placeholder="VNS-TR-001"
          />
          <InputField
            label="Rated Voltage"
            value={String(input.ratedVoltage)}
            onChange={(v) => updateField('ratedVoltage', Number(v))}
            error={errors.ratedVoltage}
            unit="V"
            type="number"
          />
          <InputField
            label="Rated Current"
            value={String(input.ratedCurrent)}
            onChange={(v) => updateField('ratedCurrent', Number(v))}
            error={errors.ratedCurrent}
            unit="A"
            type="number"
          />
          <InputField
            label="Measured Voltage"
            value={String(input.measuredVoltage)}
            onChange={(v) => updateField('measuredVoltage', Number(v))}
            error={errors.measuredVoltage}
            unit="V"
            type="number"
          />
          <InputField
            label="Measured Current"
            value={String(input.measuredCurrent)}
            onChange={(v) => updateField('measuredCurrent', Number(v))}
            error={errors.measuredCurrent}
            unit="A"
            type="number"
          />
          <InputField
            label="Temperature"
            value={String(input.temperature)}
            onChange={(v) => updateField('temperature', Number(v))}
            error={errors.temperature}
            unit="°C"
            type="number"
          />
          <InputField
            label="Power Loss (optional)"
            value={input.powerLossPercent !== undefined ? String(input.powerLossPercent) : ''}
            onChange={(v) => updateField('powerLossPercent', v === '' ? undefined : Number(v))}
            unit="%"
            type="number"
          />
        </div>

        {/* Quick test scenarios */}
        <div className="mt-4">
          <p className="text-xs text-slate-500 mb-2">Quick Test Scenarios</p>
          <div className="flex flex-wrap gap-2">
            {scenarios.map((sc) => (
              <button
                key={sc.label}
                onClick={() => applyScenario(sc.values)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/60 text-slate-300 border border-slate-700 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors"
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={handleAnalyze}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/20 transition-colors"
          >
            <ArrowRight className="w-4 h-4" /> Analyze Transformer
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-slate-800/60 text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-700/60 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </Card>

      {/* ===== Analysis Results ===== */}
      {analysis && (
        <div className="flex flex-col gap-5">
          {/* Result stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            <StatCard label="Load" value={`${analysis.load.loadPercent.toFixed(1)}%`} icon={<Activity className="w-5 h-5" />} accent={analysis.load.condition === 'normal' ? 'green' : analysis.load.condition === 'warning' ? 'amber' : 'red'} />
            <StatCard label="Voltage" value={`${analysis.input.measuredVoltage} V`} icon={<Activity className="w-5 h-5" />} accent="cyan" />
            <StatCard label="Current" value={`${analysis.input.measuredCurrent} A`} icon={<Zap className="w-5 h-5" />} accent="cyan" />
            <StatCard label="Temperature" value={`${analysis.input.temperature}°C`} icon={<Thermometer className="w-5 h-5" />} accent={analysis.temperature.condition === 'normal' ? 'green' : analysis.temperature.condition === 'warning' ? 'amber' : 'red'} />
            <StatCard label="Power" value={`${analysis.power.apparentPower.toFixed(1)} VA`} icon={<TrendingDown className="w-5 h-5" />} accent="blue" />
            <StatCard label="Voltage Deviation" value={`${analysis.voltage.deviationPercent.toFixed(1)}%`} icon={<AlertTriangle className="w-5 h-5" />} accent={analysis.voltage.condition === 'normal' ? 'green' : analysis.voltage.condition === 'warning' ? 'amber' : 'red'} />
          </div>

          {/* Health gauge + Overall status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Card title="Health Score" subtitle="Calculated from entered parameters" icon={<Gauge className="w-4 h-4" />}>
              <div className="flex flex-col items-center py-2">
                <RadialGauge
                  value={analysis.healthScore.total}
                  label="Health Score"
                  unit="/100"
                  size={170}
                  thresholds={{ warning: 79, critical: 49 }}
                />
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-xs text-slate-400">Healthy (80+)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="text-xs text-slate-400">Warning (50–79)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="text-xs text-slate-400">Critical (&lt;50)</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Overall Status" subtitle="Determined from all conditions" icon={<Activity className="w-4 h-4" />}>
              <div className="flex flex-col items-center justify-center gap-4 py-4">
                <div className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border ${statusBadgeClass(analysis.status)}`}>
                  {statusIcon(analysis.status)}
                  <span className="text-lg font-bold uppercase tracking-wide">{analysis.status}</span>
                </div>
                {analysis.isOverloaded && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-semibold">OVERLOAD</span>
                  </div>
                )}
                <div className="w-full mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">Score Breakdown</span>
                    <span className="text-xs font-semibold text-white">{analysis.healthScore.total}/100</span>
                  </div>
                  <ProgressBar label={`Load (${analysis.healthScore.loadScore}/30)`} value={analysis.healthScore.loadScore} max={30} color="#06b6d4" height={6} />
                  <div className="mt-1.5">
                    <ProgressBar label={`Temperature (${analysis.healthScore.temperatureScore}/30)`} value={analysis.healthScore.temperatureScore} max={30} color="#f59e0b" height={6} />
                  </div>
                  <div className="mt-1.5">
                    <ProgressBar label={`Voltage (${analysis.healthScore.voltageScore}/25)`} value={analysis.healthScore.voltageScore} max={25} color="#8b5cf6" height={6} />
                  </div>
                  <div className="mt-1.5">
                    <ProgressBar label={`Power Loss (${analysis.healthScore.powerLossScore}/15)`} value={analysis.healthScore.powerLossScore} max={15} color="#ef4444" height={6} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Power Loss card */}
            <Card title="Power Loss" subtitle="Entered power-loss percentage" icon={<TrendingDown className="w-4 h-4" />}>
              <div className="flex flex-col items-center justify-center gap-3 py-6">
                <span className="text-4xl font-bold text-white">
                  {analysis.input.powerLossPercent !== undefined ? `${analysis.input.powerLossPercent}%` : '—'}
                </span>
                {analysis.input.powerLossPercent !== undefined && (
                  <span className={`text-sm font-medium ${analysis.input.powerLossPercent <= 5 ? 'text-emerald-400' : analysis.input.powerLossPercent <= 10 ? 'text-amber-400' : 'text-red-400'}`}>
                    {analysis.input.powerLossPercent <= 5 ? 'Normal' : analysis.input.powerLossPercent <= 10 ? 'Warning' : 'Critical'}
                  </span>
                )}
                <div className="w-full mt-2">
                  <ProgressBar
                    value={analysis.input.powerLossPercent ?? 0}
                    max={15}
                    height={6}
                    color={analysis.input.powerLossPercent !== undefined && analysis.input.powerLossPercent > 10 ? '#ef4444' : analysis.input.powerLossPercent !== undefined && analysis.input.powerLossPercent > 5 ? '#f59e0b' : '#22c55e'}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Condition Analysis */}
          <Card title="Condition Analysis" subtitle="Individual parameter conditions based on demo thresholds" icon={<Activity className="w-4 h-4" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <ConditionRow label="Load Condition" condition={analysis.load.condition} detail={`${analysis.load.loadPercent.toFixed(1)}% load`} />
              <ConditionRow label="Temperature" condition={analysis.temperature.condition} detail={`${analysis.input.temperature}°C`} />
              <ConditionRow label="Voltage Condition" condition={analysis.voltage.condition} detail={`${analysis.voltage.deviationPercent.toFixed(1)}% deviation`} />
              <ConditionRow
                label="Power Loss"
                condition={
                  analysis.input.powerLossPercent === undefined ? 'normal' :
                  analysis.input.powerLossPercent <= 5 ? 'normal' :
                  analysis.input.powerLossPercent <= 10 ? 'warning' : 'critical'
                }
                detail={analysis.input.powerLossPercent !== undefined ? `${analysis.input.powerLossPercent}%` : 'Not provided'}
              />
            </div>
            <p className="text-xs text-slate-600 mt-3">
              Demo thresholds — Load: &lt;80% normal, 80–100% warning, &gt;100% overload. Temperature: &lt;60°C normal, 60–75°C warning, &gt;75°C critical. Voltage: ≤5% normal, 5–10% warning, &gt;10% critical. Power Loss: ≤5% normal, 5–10% warning, &gt;10% critical.
            </p>
          </Card>

          {/* Alerts + Recommendation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card title="Generated Alerts" subtitle={`${analysis.alerts.length} alert${analysis.alerts.length !== 1 ? 's' : ''} from analysis`} icon={<AlertTriangle className="w-4 h-4" />}>
              <div className="flex flex-col gap-2.5">
                {analysis.alerts.length === 0 ? (
                  <div className="flex items-center gap-2.5 p-3.5 bg-emerald-500/5 border border-emerald-500/15 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <p className="text-sm text-emerald-400 font-medium">No critical conditions detected.</p>
                  </div>
                ) : (
                  analysis.alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3.5 bg-slate-800/40 rounded-lg border border-slate-800">
                      <div className={`mt-0.5 ${alert.severity === 'critical' ? 'text-red-400' : 'text-amber-400'}`}>
                        {alert.severity === 'critical' ? <AlertCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{alert.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{alert.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card title="Recommended Action" subtitle="Based on calculated conditions" icon={<Lightbulb className="w-4 h-4" />}>
              <div className="flex items-start gap-3 p-4 bg-slate-800/40 rounded-lg border border-slate-800">
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  analysis.status === 'healthy' ? 'bg-emerald-500/10 text-emerald-400' :
                  analysis.status === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-red-500/10 text-red-400'
                }`}>
                  <Lightbulb className="w-5 h-5" />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{analysis.recommendation}</p>
              </div>
            </Card>
          </div>

          {/* Demo Telemetry */}
          <Card title="Demo Telemetry" subtitle="Analyzed values in monitoring-style layout — not from a physical transformer" icon={<Radio className="w-4 h-4" />}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <TelemetryItem label="Transformer ID" value={analysis.input.transformerId} />
              <TelemetryItem label="Measured Voltage" value={`${analysis.input.measuredVoltage} V`} />
              <TelemetryItem label="Measured Current" value={`${analysis.input.measuredCurrent} A`} />
              <TelemetryItem label="Temperature" value={`${analysis.input.temperature}°C`} />
              <TelemetryItem label="Apparent Power" value={`${analysis.power.apparentPower.toFixed(1)} VA`} />
              <TelemetryItem label="Load" value={`${analysis.load.loadPercent.toFixed(1)}%`} />
            </div>
            <div className="mt-4">
              <p className="text-xs text-slate-500 mb-2">Parameter Distribution</p>
              <ProgressBar label="Load" value={analysis.load.loadPercent} max={150} color="#06b6d4" height={8} showValue unit="%" />
              <div className="mt-2">
                <ProgressBar label="Temperature" value={analysis.input.temperature} max={100} color="#f59e0b" height={8} showValue unit="°C" />
              </div>
              <div className="mt-2">
                <ProgressBar label="Voltage Deviation" value={analysis.voltage.deviationPercent} max={15} color="#ef4444" height={8} showValue unit="%" />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ===== Existing grid-level charts ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title="Transformer Status Distribution" subtitle="By operational state" icon={<Box className="w-4 h-4" />}>
          <div className="flex items-center justify-center gap-4">
            <DonutChart segments={loadDistribution} centerValue={formatNumber(grid.totalTransformers)} centerLabel="Total" size={150} thickness={24} />
          </div>
          <div className="mt-3">
            <DonutLegend segments={loadDistribution} formatValue={(v) => formatNumber(v)} />
          </div>
        </Card>

        <Card title="Substation Health Summary" subtitle="Status across monitored substations" icon={<Activity className="w-4 h-4" />}>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex items-center justify-between p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-sm text-slate-300">Healthy</span>
              </div>
              <span className="text-lg font-bold text-emerald-400">{statusCounts.healthy}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-500/5 border border-amber-500/15 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="text-sm text-slate-300">Warning</span>
              </div>
              <span className="text-lg font-bold text-amber-400">{statusCounts.warning}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-500/5 border border-red-500/15 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="text-sm text-slate-300">Critical</span>
              </div>
              <span className="text-lg font-bold text-red-400">{statusCounts.critical}</span>
            </div>
          </div>
        </Card>

        <Card title="Load & Health Overview" subtitle="Average metrics" icon={<TrendingDown className="w-4 h-4" />}>
          <div className="flex flex-col gap-4 py-2">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-400">Avg Load</span>
                <span className="text-xs font-semibold text-white">{formatPercent(substations.reduce((s, ss) => s + ss.loadPercent, 0) / substations.length, 0)}</span>
              </div>
              <ProgressBar value={substations.reduce((s, ss) => s + ss.loadPercent, 0) / substations.length} color="#06b6d4" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-400">Avg Health</span>
                <span className="text-xs font-semibold text-white">{grid.averageHealthScore}/100</span>
              </div>
              <ProgressBar value={grid.averageHealthScore} color="#22c55e" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-400">Avg Power Loss</span>
                <span className="text-xs font-semibold text-white">{formatPercent(substations.reduce((s, ss) => s + ss.powerLossPercent, 0) / substations.length, 1)}</span>
              </div>
              <ProgressBar value={substations.reduce((s, ss) => s + ss.powerLossPercent, 0) / substations.length} max={10} color="#f59e0b" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-400">Total Faults</span>
                <span className="text-xs font-semibold text-white">{substations.reduce((s, ss) => s + ss.faultCount, 0)}</span>
              </div>
              <ProgressBar value={substations.reduce((s, ss) => s + ss.faultCount, 0)} max={100} color="#ef4444" />
            </div>
          </div>
        </Card>
      </div>

      {/* Existing substation table */}
      <Card title="Substation Directory" subtitle={`${filtered.length} substations`} icon={<Filter className="w-4 h-4" />}
        action={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search substations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-sm bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 w-40 md:w-56"
              />
            </div>
            <div className="flex items-center gap-1">
              {(['all', 'healthy', 'warning', 'critical'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                    filter === f ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        }
      >
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-800">
                <th className="text-left font-medium px-5 py-2.5">Substation</th>
                <th className="text-left font-medium px-3 py-2.5">Area</th>
                <th className="text-left font-medium px-3 py-2.5">Status</th>
                <th className="text-right font-medium px-3 py-2.5">Load</th>
                <th className="text-right font-medium px-3 py-2.5">Health</th>
                <th className="text-right font-medium px-3 py-2.5 hidden md:table-cell">Voltage</th>
                <th className="text-right font-medium px-3 py-2.5 hidden md:table-cell">Power Flow</th>
                <th className="text-right font-medium px-3 py-2.5 hidden lg:table-cell">Loss</th>
                <th className="text-right font-medium px-3 py-2.5 hidden lg:table-cell">Transformers</th>
                <th className="text-right font-medium px-5 py-2.5 hidden lg:table-cell">Faults</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s: Substation) => (
                <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3">
                    <span className="font-medium text-white">{s.name}</span>
                    <span className="block text-xs text-slate-500">{s.id}</span>
                  </td>
                  <td className="px-3 py-3 text-slate-300">{s.area}</td>
                  <td className="px-3 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-3 py-3 text-right">
                    <span className={s.loadPercent > 90 ? 'text-red-400 font-semibold' : s.loadPercent > 80 ? 'text-amber-400 font-semibold' : 'text-slate-300'}>{s.loadPercent}%</span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span className={s.healthScore >= 80 ? 'text-emerald-400 font-semibold' : s.healthScore >= 65 ? 'text-amber-400 font-semibold' : 'text-red-400 font-semibold'}>{s.healthScore}</span>
                  </td>
                  <td className="px-3 py-3 text-right text-slate-400 hidden md:table-cell">{s.voltageKV} kV</td>
                  <td className="px-3 py-3 text-right text-slate-300 hidden md:table-cell">{s.powerFlowMW} MW</td>
                  <td className="px-3 py-3 text-right hidden lg:table-cell">
                    <span className={s.powerLossPercent > 5 ? 'text-red-400 font-semibold' : s.powerLossPercent > 3.5 ? 'text-amber-400' : 'text-emerald-400'}>{s.powerLossPercent}%</span>
                  </td>
                  <td className="px-3 py-3 text-right text-slate-300 hidden lg:table-cell">{formatNumber(s.transformers)}</td>
                  <td className="px-5 py-3 text-right hidden lg:table-cell">
                    <span className={s.faultCount > 40 ? 'text-red-400 font-semibold' : s.faultCount > 20 ? 'text-amber-400' : 'text-slate-300'}>{s.faultCount}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ===== Helper components =====

function InputField({
  label, value, onChange, error, unit, placeholder, type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  unit?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs text-slate-400 font-medium mb-1.5 block">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 ${unit ? 'pr-10' : 'pr-3'} py-2 text-sm bg-slate-800/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
            error ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700 focus:border-cyan-500/50'
          }`}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-medium pointer-events-none">{unit}</span>
        )}
      </div>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

function ConditionRow({ label, condition, detail }: { label: string; condition: ConditionLevel | 'overload'; detail: string }) {
  const isNormal = condition === 'normal';
  const isOverload = condition === 'overload';
  const bgClass = isNormal ? 'bg-emerald-500/5 border-emerald-500/15' : isOverload ? 'bg-orange-500/5 border-orange-500/15' : condition === 'warning' ? 'bg-amber-500/5 border-amber-500/15' : 'bg-red-500/5 border-red-500/15';
  return (
    <div className={`flex items-center justify-between p-3 ${bgClass} border rounded-lg`}>
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 text-slate-400" />
        <span className="text-sm text-slate-300">{label}</span>
      </div>
      <div className="text-right">
        <span className={`text-sm font-semibold ${conditionColor(condition)}`}>{conditionLabel(condition)}</span>
        <span className="block text-xs text-slate-500">{detail}</span>
      </div>
    </div>
  );
}

function TelemetryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-800">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-white mt-1">{value}</p>
    </div>
  );
}
