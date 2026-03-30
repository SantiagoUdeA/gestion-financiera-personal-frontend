import { TransactionRequest, TransactionResponse } from '@/types/transaction';
import { ITransactionService } from './ITransactionService';
import { CATEGORIES } from '@/types/category';

let FAKE_TRANSACTIONS: TransactionResponse[] = [
  { id: 1, tipo: 'INGRESO', monto: 3500000, fecha: '2026-03-01', categoria: 'Salario' },
  { id: 2, tipo: 'GASTO', monto: 850000, fecha: '2026-03-03', categoria: 'Vivienda' },
  { id: 3, tipo: 'GASTO', monto: 120000, fecha: '2026-03-05', categoria: 'Alimentación' },
  { id: 4, tipo: 'GASTO', monto: 45000, fecha: '2026-03-07', categoria: 'Transporte' },
  { id: 5, tipo: 'INGRESO', monto: 500000, fecha: '2026-03-10', categoria: 'Freelance' },
  { id: 6, tipo: 'GASTO', monto: 95000, fecha: '2026-03-12', categoria: 'Entretenimiento' },
  { id: 7, tipo: 'GASTO', monto: 200000, fecha: '2026-03-15', categoria: 'Salud' },
  { id: 8, tipo: 'GASTO', monto: 78000, fecha: '2026-03-18', categoria: 'Alimentación' },
  { id: 9, tipo: 'INGRESO', monto: 250000, fecha: '2026-03-20', categoria: 'Inversiones' },
  { id: 10, tipo: 'GASTO', monto: 55000, fecha: '2026-03-22', categoria: 'Educación' },
  { id: 11, tipo: 'GASTO', monto: 130000, fecha: '2026-03-25', categoria: 'Ropa' },
  { id: 12, tipo: 'GASTO', monto: 89000, fecha: '2026-03-28', categoria: 'Servicios' },
];

let nextId = 13;

export class FakeTransactionService implements ITransactionService {
  async listar(): Promise<TransactionResponse[]> {
    await new Promise((r) => setTimeout(r, 400));
    return [...FAKE_TRANSACTIONS].sort(
      (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );
  }

  async crear(request: TransactionRequest): Promise<TransactionResponse> {
    await new Promise((r) => setTimeout(r, 400));
    const cat = CATEGORIES.find((c) => c.id === request.categoriaId);
    const newTx: TransactionResponse = {
      id: nextId++,
      tipo: request.tipo,
      monto: request.monto,
      fecha: request.fecha,
      categoria: cat?.nombre ?? 'Sin categoría',
    };
    FAKE_TRANSACTIONS = [newTx, ...FAKE_TRANSACTIONS];
    return newTx;
  }
}
