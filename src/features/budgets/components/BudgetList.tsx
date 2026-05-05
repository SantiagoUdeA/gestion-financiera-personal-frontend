'use client';

import { BudgetResponse } from '@/types/budget';
import { Pencil, Trash2 } from 'lucide-react';

const MONTHS_ES = [
  '', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);

interface BudgetListProps {
  readonly budgets: BudgetResponse[];
  readonly loading: boolean;
  readonly onEdit: (budget: BudgetResponse) => void;
  readonly onDelete: (id: number) => void;
  readonly deleting: number | null;
}

export function BudgetList({ budgets, loading, onEdit, onDelete, deleting }: BudgetListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-700/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (budgets.length === 0) {
    return (
      <p className="text-slate-500 text-sm text-center py-8">
        No tienes presupuestos registrados. Crea uno para empezar.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {budgets.map((b) => (
        <div
          key={b.id}
          className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-slate-700/20 rounded-lg border border-slate-700/40 hover:border-slate-600/60 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">{b.categoryName}</p>
            <p className="text-emerald-400 text-sm font-semibold">{formatCurrency(b.amount)}</p>
            <p className="text-slate-500 text-xs mt-0.5">
              {MONTHS_ES[b.startMonth]} {b.startYear}
              {b.durationMonths > 0 && ` → ${MONTHS_ES[b.endMonth]} ${b.endYear}`}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onEdit(b)}
              className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-md transition-colors"
              title="Editar"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onDelete(b.id)}
              disabled={deleting === b.id}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors disabled:opacity-50"
              title="Eliminar"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
