import { FakeBudgetService } from './FakeBudgetService';
import { BudgetService } from './BudgetService';

const USE_FAKE = process.env.NEXT_PUBLIC_USE_FAKE_SERVICES !== 'false';

export const budgetService = USE_FAKE
  ? new FakeBudgetService()
  : new BudgetService();
export type { IBudgetService } from './IBudgetService';
