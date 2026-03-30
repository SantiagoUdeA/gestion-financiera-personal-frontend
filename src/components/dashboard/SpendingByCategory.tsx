'use client';

interface SpendingByCategoryProps {
  data: Record<string, number>;
}

const COLORS = [
  'bg-emerald-400',
  'bg-blue-400',
  'bg-amber-400',
  'bg-purple-400',
  'bg-red-400',
  'bg-cyan-400',
  'bg-pink-400',
];

export function SpendingByCategory({ data }: SpendingByCategoryProps) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, v]) => sum + v, 0);

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-slate-500">
        <p className="text-sm">Sin datos de gastos</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map(([cat, amount], i) => {
        const pct = total > 0 ? (amount / total) * 100 : 0;
        return (
          <div key={cat}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-300 text-sm">{cat}</span>
              <span className="text-slate-400 text-sm">
                {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount)}
              </span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${COLORS[i % COLORS.length]} transition-all duration-500`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-slate-500 text-xs mt-0.5">{pct.toFixed(1)}%</p>
          </div>
        );
      })}
    </div>
  );
}
