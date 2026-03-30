'use client';

import { TransactionResponse } from '@/types/transaction';
import { Badge } from '@/components/ui/badge';
import { ArrowUpCircle, ArrowDownCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface TransactionListProps {
  transactions: TransactionResponse[];
  loading: boolean;
}

export function TransactionList({ transactions, loading }: TransactionListProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'TODOS' | 'INGRESO' | 'GASTO'>('TODOS');

  const filtered = transactions.filter((t) => {
    const matchSearch = t.categoria.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'TODOS' || t.tipo === filter;
    return matchSearch && matchFilter;
  });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (date: string) =>
    new Date(date + 'T00:00:00').toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-800/50 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por categoría..."
            className="pl-9 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500"
          />
        </div>
        <div className="flex gap-1 shrink-0">
          {(['TODOS', 'INGRESO', 'GASTO'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white bg-slate-800 border border-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-slate-500">
          <p className="text-sm">No se encontraron transacciones</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/50 hover:border-slate-600 transition-all"
            >
              <div
                className={`p-2 rounded-full ${
                  tx.tipo === 'INGRESO' ? 'bg-emerald-500/10' : 'bg-red-500/10'
                }`}
              >
                {tx.tipo === 'INGRESO' ? (
                  <ArrowUpCircle className="h-5 w-5 text-emerald-400" />
                ) : (
                  <ArrowDownCircle className="h-5 w-5 text-red-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-slate-200 font-medium text-sm">{tx.categoria}</p>
                  <Badge
                    variant="outline"
                    className={`text-xs px-1.5 py-0 ${
                      tx.tipo === 'INGRESO'
                        ? 'border-emerald-500/30 text-emerald-400'
                        : 'border-red-500/30 text-red-400'
                    }`}
                  >
                    {tx.tipo}
                  </Badge>
                </div>
                <p className="text-slate-500 text-xs">{formatDate(tx.fecha)}</p>
              </div>
              <span
                className={`text-sm sm:text-base font-bold shrink-0 ${
                  tx.tipo === 'INGRESO' ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {tx.tipo === 'INGRESO' ? '+' : '-'}
                {formatCurrency(Number(tx.monto))}
              </span>
            </div>
          ))}
        </div>
      )}
      <p className="text-slate-500 text-xs text-right">
        {filtered.length} transacciones
      </p>
    </div>
  );
}
