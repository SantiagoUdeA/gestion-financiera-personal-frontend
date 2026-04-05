'use server';

import { TransactionRequest } from '@/types/transaction';
import { transactionService } from '../services';

export async function fetchTransactionsAction() {
  return transactionService.listar();
}

export async function createTransactionAction(request: TransactionRequest) {
  return transactionService.crear(request);
}
