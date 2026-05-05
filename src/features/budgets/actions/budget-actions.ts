'use server';

import { BudgetRequest } from '@/types/budget';
import { budgetService } from '../services';

export async function fetchBudgetsAction() {
  return budgetService.list();
}

export async function createBudgetAction(request: BudgetRequest) {
  return budgetService.create(request);
}

export async function updateBudgetAction(id: number, request: BudgetRequest) {
  return budgetService.update(id, request);
}

export async function deleteBudgetAction(id: number) {
  return budgetService.delete(id);
}

export async function fetchComparativaAction() {
  return budgetService.comparativa();
}
