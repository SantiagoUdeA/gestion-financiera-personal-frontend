export interface CategoryRequest {
  nombre: string;
  tipo: 'INGRESO' | 'GASTO';
}

export interface CategoryResponse {
  id: number;
  nombre: string;
  tipo: 'INGRESO' | 'GASTO';
}
