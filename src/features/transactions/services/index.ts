import { FakeTransactionService } from './FakeTransactionService';
import { TransactionService } from './TransactionService';

const USE_FAKE = process.env.NEXT_PUBLIC_USE_FAKE_SERVICES !== 'false';

export const transactionService = USE_FAKE
  ? new FakeTransactionService()
  : new TransactionService();
export type { ITransactionService } from './ITransactionService';
