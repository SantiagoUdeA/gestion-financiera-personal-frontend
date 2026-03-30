'use client';

import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { TransactionList } from '@/features/transactions/components/TransactionList';
import { TransactionForm } from '@/features/transactions/components/TransactionForm';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function TransactionsPage() {
  const { transactions, loading, creating, createTransaction, totals, balance } = useTransactions();
  const [showForm, setShowForm] = useState(false);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Transacciones</h1>
          <p className="text-slate-400 mt-1 text-sm hidden sm:block">Registra y consulta tus movimientos</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nueva transacción</span>
          <span className="sm:hidden">Nueva</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'Ingresos', value: totals.ingresos, color: 'text-emerald-400' },
          { label: 'Gastos', value: totals.gastos, color: 'text-red-400' },
          { label: 'Balance', value: balance, color: balance >= 0 ? 'text-emerald-400' : 'text-red-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-3 sm:p-4">
            <p className="text-slate-400 text-xs sm:text-sm">{label}</p>
            <p className={`text-base sm:text-xl font-bold mt-1 ${color}`}>{formatCurrency(value)}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {showForm && (
          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 sm:p-6">
            <h2 className="text-white font-semibold mb-4">Nueva transacción</h2>
            <TransactionForm onSubmit={(data) => createTransaction(data).then(() => void 0)} creating={creating} />
          </div>
        )}
        <div className={showForm ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 sm:p-6">
            <h2 className="text-white font-semibold mb-4">Historial</h2>
            <TransactionList transactions={transactions} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
