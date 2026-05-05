import { BudgetRequest, BudgetResponse, BudgetComparisonResponse } from '@/types/budget';

export interface IBudgetService {
  list(): Promise<BudgetResponse[]>;
  create(request: BudgetRequest): Promise<BudgetResponse>;
  update(id: number, request: BudgetRequest): Promise<BudgetResponse>;
  delete(id: number): Promise<void>;
  comparativa(): Promise<BudgetComparisonResponse[]>;
}
