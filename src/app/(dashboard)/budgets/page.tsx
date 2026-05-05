'use client';

import { useEffect, useState } from 'react';
import {
  fetchBudgetsAction,
  createBudgetAction,
  updateBudgetAction,
  deleteBudgetAction,
  fetchComparativaAction,
} from '@/features/budgets/actions/budget-actions';
import { BudgetForm } from '@/features/budgets/components/BudgetForm';
import { BudgetList } from '@/features/budgets/components/BudgetList';
import { BudgetComparison } from '@/features/budgets/components/BudgetComparison';
import { BudgetRequest, BudgetResponse, BudgetComparisonResponse } from '@/types/budget';
import { Plus, BarChart2, Wallet } from 'lucide-react';

type Tab = 'presupuestos' | 'comparativa';

export default function BudgetsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('presupuestos');
  const [budgets, setBudgets] = useState<BudgetResponse[]>([]);
  const [comparativa, setComparativa] = useState<BudgetComparisonResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingComp, setLoadingComp] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<BudgetResponse | null>(null);

  useEffect(() => {
    fetchBudgetsAction()
      .then(setBudgets)
      .finally(() => setLoading(false));
    fetchComparativaAction()
      .then(setComparativa)
      .finally(() => setLoadingComp(false));
  }, []);

  const handleCreate = async (data: BudgetRequest) => {
    setSaving(true);
    try {
      const created = await createBudgetAction(data);
      setBudgets((prev) => [...prev, created]);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (data: BudgetRequest) => {
    if (!editTarget) return;
    setSaving(true);
    try {
      const updated = await updateBudgetAction(editTarget.id, data);
      setBudgets((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
      setEditTarget(null);
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeleting(id);
    try {
      await deleteBudgetAction(id);
      setBudgets((prev) => prev.filter((b) => b.id !== id));
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = (budget: BudgetResponse) => {
    setEditTarget(budget);
    setShowForm(true);
    setActiveTab('presupuestos');
  };

  const handleCancel = () => {
    setEditTarget(null);
    setShowForm(false);
  };

  const excedidos = comparativa.filter((c) => c.porcentaje !== null && c.porcentaje > 100).length;
  const alertas = comparativa.filter((c) => c.porcentaje !== null && c.porcentaje >= 80 && c.porcentaje <= 100).length;

  const tabClass = (tab: Tab) =>
    `flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      activeTab === tab
        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Presupuestos</h1>
          <p className="text-slate-400 mt-1 text-sm hidden sm:block">
            Controla tus límites de gasto por categoría
          </p>
        </div>
        {activeTab === 'presupuestos' && (
          <button
            onClick={() => {
              setEditTarget(null);
              setShowForm(!showForm);
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nuevo presupuesto</span>
            <span className="sm:hidden">Nuevo</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'Total', value: budgets.length, color: 'text-white' },
          { label: 'Alertas', value: alertas, color: 'text-amber-400' },
          { label: 'Excedidos', value: excedidos, color: 'text-red-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-3 sm:p-4">
            <p className="text-slate-400 text-xs sm:text-sm">{label}</p>
            <p className={`text-base sm:text-xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={() => setActiveTab('presupuestos')} className={tabClass('presupuestos')}>
          <Wallet className="h-4 w-4" />
          Mis presupuestos
        </button>
        <button onClick={() => setActiveTab('comparativa')} className={tabClass('comparativa')}>
          <BarChart2 className="h-4 w-4" />
          Comparativa
        </button>
      </div>

      {activeTab === 'presupuestos' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {showForm && (
            <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 sm:p-6">
              <h2 className="text-white font-semibold mb-4">
                {editTarget ? 'Editar presupuesto' : 'Nuevo presupuesto'}
              </h2>
              <BudgetForm
                onSubmit={editTarget ? handleUpdate : handleCreate}
                saving={saving}
                editTarget={editTarget}
                onCancel={handleCancel}
              />
            </div>
          )}
          <div className={showForm ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 sm:p-6">
              <h2 className="text-white font-semibold mb-4">Listado</h2>
              <BudgetList
                budgets={budgets}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                deleting={deleting}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'comparativa' && (
        <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <h2 className="text-white font-semibold mb-2">Presupuesto vs Gasto — Este mes</h2>
          <p className="text-slate-500 text-sm mb-6">
            Compara cuánto has gastado frente al límite asignado por categoría
          </p>
          <BudgetComparison data={comparativa} loading={loadingComp} />
        </div>
      )}
    </div>
  );
}
