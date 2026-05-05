import { BudgetRequest, BudgetResponse, BudgetComparisonResponse } from '@/types/budget';
import { IBudgetService } from './IBudgetService';

const now = new Date();
const currentMonth = now.getMonth() + 1;
const currentYear = now.getFullYear();

let FAKE_BUDGETS: BudgetResponse[] = [
  {
    id: 1, categoryName: 'Alimentación', amount: 500000,
    startMonth: currentMonth, startYear: currentYear,
    durationMonths: 0, endMonth: currentMonth, endYear: currentYear,
  },
  {
    id: 2, categoryName: 'Transporte', amount: 200000,
    startMonth: currentMonth, startYear: currentYear,
    durationMonths: 2, endMonth: (currentMonth + 2 - 1) % 12 + 1, endYear: currentYear,
  },
];

let nextId = 3;
const delay = () => new Promise((r) => setTimeout(r, 300));

export class FakeBudgetService implements IBudgetService {
  async list(): Promise<BudgetResponse[]> {
    await delay();
    return [...FAKE_BUDGETS];
  }

  async create(request: BudgetRequest): Promise<BudgetResponse> {
    await delay();
    const endDate = new Date(currentYear, currentMonth - 1 + request.durationMonths);
    const budget: BudgetResponse = {
      id: nextId++,
      categoryName: `Categoría ${request.categoryId}`,
      amount: request.amount,
      startMonth: currentMonth,
      startYear: currentYear,
      durationMonths: request.durationMonths,
      endMonth: endDate.getMonth() + 1,
      endYear: endDate.getFullYear(),
    };
    FAKE_BUDGETS = [...FAKE_BUDGETS, budget];
    return budget;
  }

  async update(id: number, request: BudgetRequest): Promise<BudgetResponse> {
    await delay();
    const endDate = new Date(currentYear, currentMonth - 1 + request.durationMonths);
    const updated: BudgetResponse = {
      id,
      categoryName: FAKE_BUDGETS.find((b) => b.id === id)?.categoryName ?? `Categoría ${request.categoryId}`,
      amount: request.amount,
      startMonth: currentMonth,
      startYear: currentYear,
      durationMonths: request.durationMonths,
      endMonth: endDate.getMonth() + 1,
      endYear: endDate.getFullYear(),
    };
    FAKE_BUDGETS = FAKE_BUDGETS.map((b) => (b.id === id ? updated : b));
    return updated;
  }

  async delete(id: number): Promise<void> {
    await delay();
    FAKE_BUDGETS = FAKE_BUDGETS.filter((b) => b.id !== id);
  }

  async comparativa(): Promise<BudgetComparisonResponse[]> {
    await delay();
    return [
      { categoriaNombre: 'Alimentación', presupuesto: 500000, gastado: 320000, disponible: 180000, porcentaje: 64, alerta: 'Llevas el 64% del presupuesto de Alimentación utilizado' },
      { categoriaNombre: 'Transporte', presupuesto: 200000, gastado: 175000, disponible: 25000, porcentaje: 87.5, alerta: 'Has superado el 80% del presupuesto de Transporte' },
      { categoriaNombre: 'Entretenimiento', presupuesto: null, gastado: 95000, disponible: null, porcentaje: null, alerta: null },
      { categoriaNombre: 'Salud', presupuesto: 150000, gastado: 200000, disponible: -50000, porcentaje: 133.33, alerta: 'Has excedido el presupuesto de Salud en 50000 COP' },
    ];
  }
}
