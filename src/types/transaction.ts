export interface TransactionRequest {
  tipo: 'INGRESO' | 'GASTO';
  monto: number;
  categoriaId: number;
}

export interface TransactionResponse {
  id: number;
  tipo: 'INGRESO' | 'GASTO';
  monto: number;
  fecha: string;
  categoria: string;
}
