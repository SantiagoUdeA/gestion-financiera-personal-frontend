export interface TransactionRequest {
  tipo: 'INGRESO' | 'GASTO';
  monto: number;
  fecha: string;
  categoriaId: number;
}

export interface TransactionResponse {
  id: number;
  tipo: 'INGRESO' | 'GASTO';
  monto: number;
  fecha: string;
  categoria: string;
}
