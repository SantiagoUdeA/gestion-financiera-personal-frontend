import { cookies } from 'next/headers';
import { BudgetRequest, BudgetResponse, BudgetComparisonResponse } from '@/types/budget';
import { IBudgetService } from './IBudgetService';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

export class BudgetService implements IBudgetService {
  private async getHeaders() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value ?? '';
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  async list(): Promise<BudgetResponse[]> {
    const res = await fetch(`${BASE_URL}/api/v1/presupuestos`, {
      headers: await this.getHeaders(),
    });
    if (!res.ok) throw new Error('Error al cargar presupuestos');
    return res.json();
  }

  async create(request: BudgetRequest): Promise<BudgetResponse> {
    const res = await fetch(`${BASE_URL}/api/v1/presupuestos`, {
      method: 'POST',
      headers: await this.getHeaders(),
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error('Error al crear presupuesto');
    return res.json();
  }

  async update(id: number, request: BudgetRequest): Promise<BudgetResponse> {
    const res = await fetch(`${BASE_URL}/api/v1/presupuestos/${id}`, {
      method: 'PUT',
      headers: await this.getHeaders(),
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error('Error al actualizar presupuesto');
    return res.json();
  }

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/v1/presupuestos/${id}`, {
      method: 'DELETE',
      headers: await this.getHeaders(),
    });
    if (!res.ok) throw new Error('Error al eliminar presupuesto');
  }

  async comparativa(): Promise<BudgetComparisonResponse[]> {
    const res = await fetch(`${BASE_URL}/api/v1/presupuestos/comparativa`, {
      headers: await this.getHeaders(),
    });
    if (!res.ok) throw new Error('Error al cargar comparativa');
    const data = await res.json();
    // HATEOAS: comparativa returns CollectionModel with _embedded
    if (data._embedded) {
      return Object.values(data._embedded)[0] as BudgetComparisonResponse[];
    }
    return Array.isArray(data) ? data : [];
  }
}
