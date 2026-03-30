import { TransactionResponse } from '@/types/transaction';
import { Badge } from '@/components/ui/badge';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface RecentTransactionsProps {
  transactions: TransactionResponse[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recent = transactions.slice(0, 6);

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
    });

  if (recent.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-slate-500">
        <p className="text-sm">Sin transacciones recientes</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {recent.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/60 transition-colors"
        >
          <div
            className={`p-1.5 rounded-full ${
              tx.tipo === 'INGRESO' ? 'bg-emerald-500/10' : 'bg-red-500/10'
            }`}
          >
            {tx.tipo === 'INGRESO' ? (
              <ArrowUpCircle className="h-4 w-4 text-emerald-400" />
            ) : (
              <ArrowDownCircle className="h-4 w-4 text-red-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-200 text-sm font-medium truncate">{tx.categoria}</p>
            <p className="text-slate-500 text-xs">{formatDate(tx.fecha)}</p>
          </div>
          <span
            className={`text-sm font-semibold ${
              tx.tipo === 'INGRESO' ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {tx.tipo === 'INGRESO' ? '+' : '-'}
            {formatCurrency(Number(tx.monto))}
          </span>
        </div>
      ))}
    </div>
  );
}
