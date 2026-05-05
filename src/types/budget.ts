export interface BudgetRequest {
  categoryId: number;
  amount: number;
  durationMonths: number;
}

export interface BudgetResponse {
  id: number;
  categoryName: string;
  amount: number;
  startMonth: number;
  startYear: number;
  durationMonths: number;
  endMonth: number;
  endYear: number;
}

export interface BudgetComparisonResponse {
  categoriaNombre: string;
  presupuesto: number | null;
  gastado: number;
  disponible: number | null;
  porcentaje: number | null;
  alerta: string | null;
}
