"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import { StatCard } from "@/components/dashboard/StatCard";
import { SpendingByCategory } from "@/components/dashboard/SpendingByCategory";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { FinancialHealthCard } from "@/components/dashboard/FinancialHealthCard";
import { Wallet, TrendingDown, TrendingUp, Scale } from "lucide-react";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);

export default function DashboardPage() {
  const { user } = useAuthContext();
  const { transactions, loading, totals, balance, byCategory } =
    useTransactions();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          ¡Hola, {user?.primer_nombre}!
        </h1>
        <p className="text-slate-400 mt-1">
          Aquí está el resumen de tus finanzas
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-slate-800/50 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Balance total"
            value={formatCurrency(balance)}
            icon={Wallet}
            variant={balance >= 0 ? "emerald" : "red"}
            subtitle="Ingresos - Gastos"
          />
          <StatCard
            title="Total ingresos"
            value={formatCurrency(totals.ingresos)}
            icon={TrendingUp}
            variant="emerald"
            subtitle="Este período"
          />
          <StatCard
            title="Total gastos"
            value={formatCurrency(totals.gastos)}
            icon={TrendingDown}
            variant="red"
            subtitle="Este período"
          />
          <StatCard
            title="Transacciones"
            value={transactions.length.toString()}
            icon={Scale}
            variant="blue"
            subtitle="Registradas"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
        <div className="lg:col-span-2 bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <h2 className="text-white font-semibold mb-4">
            Transacciones recientes
          </h2>
          <RecentTransactions transactions={transactions} />
        </div>

        <div className="space-y-5 lg:space-y-6">
          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 sm:p-6">
            <h2 className="text-white font-semibold mb-4">
              Gastos por categoría
            </h2>
            <SpendingByCategory data={byCategory} />
          </div>

          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 sm:p-6">
            <FinancialHealthCard
              ingresos={totals.ingresos}
              gastos={totals.gastos}
              balance={balance}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
