'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fetchCategoriesAction } from '@/features/categories/actions/category-actions';
import { CategoryResponse } from '@/types/category-api';
import { BudgetRequest, BudgetResponse } from '@/types/budget';
import { AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react';

interface BudgetFormProps {
  readonly onSubmit: (data: BudgetRequest) => Promise<void>;
  readonly saving: boolean;
  readonly editTarget: BudgetResponse | null;
  readonly onCancel: () => void;
}

const MONTH_LABELS: Record<number, string> = {
  0: 'Solo este mes',
  1: '1 mes adicional',
  2: '2 meses adicionales',
  3: '3 meses adicionales',
  4: '4 meses adicionales',
  5: '5 meses adicionales',
  6: '6 meses adicionales',
  7: '7 meses adicionales',
  8: '8 meses adicionales',
  9: '9 meses adicionales',
  10: '10 meses adicionales',
  11: '11 meses adicionales',
  12: '12 meses adicionales',
};

export function BudgetForm({ onSubmit, saving, editTarget, onCancel }: BudgetFormProps) {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [form, setForm] = useState<BudgetRequest>({
    categoryId: 0,
    amount: 0,
    durationMonths: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const gastoCategories = categories.filter((c) => c.tipo === 'GASTO');

  useEffect(() => {
    fetchCategoriesAction().then((cats) => {
      setCategories(cats);
      const gastos = cats.filter((c) => c.tipo === 'GASTO');
      if (editTarget) {
        const match = gastos.find((c) => c.nombre === editTarget.categoryName);
        setForm({
          categoryId: match?.id ?? gastos[0]?.id ?? 0,
          amount: editTarget.amount,
          durationMonths: editTarget.durationMonths,
        });
      } else if (gastos.length > 0) {
        setForm((f) => ({ ...f, categoryId: gastos[0].id }));
      }
    });
  }, [editTarget]);

  const selectedCategory = gastoCategories.find((c) => c.id === form.categoryId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!form.amount || form.amount <= 0) {
      setError('El monto debe ser mayor a 0');
      return;
    }
    if (form.categoryId === 0) {
      setError('Selecciona una categoría');
      return;
    }
    try {
      await onSubmit(form);
      if (!editTarget) {
        setSuccess(true);
        const gastos = categories.filter((c) => c.tipo === 'GASTO');
        setForm({ categoryId: gastos[0]?.id ?? 0, amount: 0, durationMonths: 0 });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al guardar presupuesto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-3 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg p-3 text-sm">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Presupuesto creado exitosamente
        </div>
      )}

      <div className="space-y-1.5">
        <Label className="text-slate-300 text-sm">Categoría (solo gastos)</Label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setCategoryOpen((o) => !o)}
            className="w-full h-9 px-3 flex items-center justify-between rounded-md bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500"
          >
            <span>{selectedCategory?.nombre ?? 'Seleccionar'}</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
          {categoryOpen && (
            <ul className="absolute z-10 mt-1 w-full rounded-md bg-slate-800 border border-slate-700 shadow-lg max-h-48 overflow-y-auto">
              {gastoCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setForm({ ...form, categoryId: cat.id });
                      setCategoryOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-700 transition-colors ${
                      form.categoryId === cat.id ? 'text-emerald-400' : 'text-white'
                    }`}
                  >
                    {cat.nombre}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="amount" className="text-slate-300 text-sm">
          Monto límite (COP)
        </Label>
        <Input
          id="amount"
          type="number"
          min="1"
          value={form.amount || ''}
          onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })}
          className="bg-slate-700/50 border-slate-600 text-white focus:border-emerald-500"
          placeholder="0"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="duration" className="text-slate-300 text-sm">
          Duración
        </Label>
        <select
          id="duration"
          value={form.durationMonths}
          onChange={(e) => setForm({ ...form, durationMonths: parseInt(e.target.value) })}
          className="w-full h-9 px-3 rounded-md bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500"
        >
          {Array.from({ length: 13 }, (_, i) => (
            <option key={i} value={i}>
              {MONTH_LABELS[i]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        {editTarget && (
          <Button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium"
          >
            Cancelar
          </Button>
        )}
        <Button
          type="submit"
          disabled={saving}
          className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold"
        >
          {saving ? 'Guardando...' : editTarget ? 'Actualizar presupuesto' : 'Crear presupuesto'}
        </Button>
      </div>
    </form>
  );
}
