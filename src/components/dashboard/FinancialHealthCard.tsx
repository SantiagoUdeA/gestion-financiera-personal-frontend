'use client';

interface FinancialHealthCardProps {
  ingresos: number;
  gastos: number;
  balance: number;
}

export function FinancialHealthCard({ ingresos, gastos, balance }: FinancialHealthCardProps) {
  const savingsRate = ingresos > 0 ? ((ingresos - gastos) / ingresos) * 100 : 0;

  const getHealthInfo = () => {
    if (savingsRate >= 20) return { label: 'Excelente', color: 'text-emerald-400', bg: 'bg-emerald-400', pct: 90 };
    if (savingsRate >= 10) return { label: 'Buena', color: 'text-blue-400', bg: 'bg-blue-400', pct: 65 };
    if (savingsRate > 0) return { label: 'Regular', color: 'text-amber-400', bg: 'bg-amber-400', pct: 40 };
    return { label: 'Crítica', color: 'text-red-400', bg: 'bg-red-400', pct: 15 };
  };

  const health = getHealthInfo();

  const getRecommendation = () => {
    if (savingsRate >= 20) return 'Excelente manejo. Considera invertir tu excedente.';
    if (savingsRate >= 10) return 'Buen progreso. Intenta incrementar tu tasa de ahorro al 20%.';
    if (savingsRate > 0) return 'Revisa gastos en entretenimiento y servicios para mejorar.';
    return 'Tus gastos superan tus ingresos. Reduce gastos no esenciales urgentemente.';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">Salud financiera</p>
          <p className={`text-xl font-bold ${health.color}`}>{health.label}</p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-xs">Tasa de ahorro</p>
          <p className={`text-lg font-bold ${health.color}`}>{savingsRate.toFixed(1)}%</p>
        </div>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${health.bg} transition-all duration-700`}
          style={{ width: `${health.pct}%` }}
        />
      </div>
      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
        <p className="text-slate-300 text-xs leading-relaxed">
          <span className="text-emerald-400 font-medium">Recomendación: </span>
          {getRecommendation()}
        </p>
      </div>
    </div>
  );
}
