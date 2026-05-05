'use client';

import { BudgetComparisonResponse } from '@/types/budget';
import { AlertTriangle, CheckCircle, XCircle, MinusCircle } from 'lucide-react';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);

function getAlertConfig(porcentaje: number | null) {
  if (porcentaje === null) return { color: 'text-slate-400', bar: 'bg-slate-600', icon: MinusCircle, label: 'Sin presupuesto' };
  if (porcentaje > 100) return { color: 'text-red-400', bar: 'bg-red-500', icon: XCircle, label: 'Excedido' };
  if (porcentaje >= 80) return { color: 'text-amber-400', bar: 'bg-amber-500', icon: AlertTriangle, label: 'Alerta' };
  return { color: 'text-emerald-400', bar: 'bg-emerald-500', icon: CheckCircle, label: 'OK' };
}

interface BudgetComparisonProps {
  readonly data: BudgetComparisonResponse[];
  readonly loading: boolean;
}

export function BudgetComparison({ data, loading }: BudgetComparisonProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-slate-700/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <p className="text-slate-500 text-sm text-center py-8">
        No hay datos de gastos para este mes.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((item) => {
        const config = getAlertConfig(item.porcentaje);
        const Icon = config.icon;
        const barWidth = item.porcentaje !== null ? Math.min(item.porcentaje, 100) : 0;

        return (
          <div key={item.categoriaNombre} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Icon className={`h-4 w-4 shrink-0 ${config.color}`} />
                <span className="text-white text-sm font-medium truncate">{item.categoriaNombre}</span>
              </div>
              <span className={`text-xs font-semibold shrink-0 ${config.color}`}>
                {item.porcentaje !== null ? `${item.porcentaje.toFixed(1)}%` : 'Sin límite'}
              </span>
            </div>

            {item.presupuesto !== null && (
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${config.bar}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            )}

            <div className="flex justify-between text-xs text-slate-500">
              <span>Gastado: <span className="text-slate-300">{formatCurrency(item.gastado)}</span></span>
              {item.presupuesto !== null && (
                <span>
                  Límite: <span className="text-slate-300">{formatCurrency(item.presupuesto)}</span>
                </span>
              )}
            </div>

            {item.alerta && (
              <p className={`text-xs ${config.color}`}>{item.alerta}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
