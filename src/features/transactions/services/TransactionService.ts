import { TransactionRequest, TransactionResponse } from '@/types/transaction';
import { ITransactionService } from './ITransactionService';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

export class TransactionService implements ITransactionService {
  private getToken() {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  }

  async listar(): Promise<TransactionResponse[]> {
    const res = await fetch(`${BASE_URL}/api/v1/transacciones`, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
    if (!res.ok) throw new Error('Error al cargar transacciones');
    return res.json();
  }

  async crear(request: TransactionRequest): Promise<TransactionResponse> {
    const res = await fetch(`${BASE_URL}/api/v1/transacciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error('Error al crear transacción');
    return res.json();
  }
}
