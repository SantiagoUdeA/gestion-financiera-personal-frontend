import { CategoryRequest, CategoryResponse } from '@/types/category-api';
import { ICategoryService } from './ICategoryService';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

export class CategoryService implements ICategoryService {
  private getToken() {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  }

  private get headers() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    };
  }

  async listar(): Promise<CategoryResponse[]> {
    const res = await fetch(`${BASE_URL}/api/v1/categorias`, {
      headers: this.headers,
    });
    if (!res.ok) throw new Error('Error al cargar categorías');
    return res.json();
  }

  async obtener(id: number): Promise<CategoryResponse> {
    const res = await fetch(`${BASE_URL}/api/v1/categorias/${id}`, {
      headers: this.headers,
    });
    if (!res.ok) throw new Error('Error al obtener categoría');
    return res.json();
  }

  async crear(request: CategoryRequest): Promise<CategoryResponse> {
    const res = await fetch(`${BASE_URL}/api/v1/categorias`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error('Error al crear categoría');
    return res.json();
  }

  async actualizar(id: number, request: CategoryRequest): Promise<CategoryResponse> {
    const res = await fetch(`${BASE_URL}/api/v1/categorias/${id}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error('Error al actualizar categoría');
    return res.json();
  }

  async eliminar(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/v1/categorias/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    });
    if (!res.ok) throw new Error('Error al eliminar categoría');
  }
}
