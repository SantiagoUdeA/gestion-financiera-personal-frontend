'use client';

import { useEffect, useState, useCallback } from 'react';
import { TransactionRequest, TransactionResponse } from '@/types/transaction';
import { transactionService } from '../services';

export function useTransactions() {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionService.listar();
      setTransactions(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al cargar transacciones');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const createTransaction = async (request: TransactionRequest) => {
    setCreating(true);
    try {
      const created = await transactionService.crear(request);
      setTransactions((prev) => [created, ...prev]);
      return created;
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Error al crear transacción');
    } finally {
      setCreating(false);
    }
  };

  const totals = transactions.reduce(
    (acc, t) => {
      if (t.tipo === 'INGRESO') acc.ingresos += Number(t.monto);
      else acc.gastos += Number(t.monto);
      return acc;
    },
    { ingresos: 0, gastos: 0 }
  );

  const balance = totals.ingresos - totals.gastos;

  const byCategory = transactions.reduce<Record<string, number>>((acc, t) => {
    if (t.tipo === 'GASTO') {
      acc[t.categoria] = (acc[t.categoria] ?? 0) + Number(t.monto);
    }
    return acc;
  }, {});

  return {
    transactions,
    loading,
    error,
    creating,
    createTransaction,
    refetch: fetchTransactions,
    totals,
    balance,
    byCategory,
  };
}
