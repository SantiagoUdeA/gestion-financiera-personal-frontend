import { CategoryRequest, CategoryResponse } from '@/types/category-api';

export interface ICategoryService {
  listar(): Promise<CategoryResponse[]>;
  obtener(id: number): Promise<CategoryResponse>;
  crear(request: CategoryRequest): Promise<CategoryResponse>;
  actualizar(id: number, request: CategoryRequest): Promise<CategoryResponse>;
  eliminar(id: number): Promise<void>;
}
