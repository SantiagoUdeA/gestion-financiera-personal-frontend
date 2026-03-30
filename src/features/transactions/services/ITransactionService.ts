import { TransactionRequest, TransactionResponse } from '@/types/transaction';

export interface ITransactionService {
  listar(): Promise<TransactionResponse[]>;
  crear(request: TransactionRequest): Promise<TransactionResponse>;
}
