import { cookies } from 'next/headers';
import { CategoryRequest, CategoryResponse } from "@/types/category-api";
import { ICategoryService } from "./ICategoryService";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export class CategoryService implements ICategoryService {
  private async getHeaders() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value ?? '';
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  async listar(): Promise<CategoryResponse[]> {
    const res = await fetch(`${BASE_URL}/api/v1/categorias`, {
      headers: await this.getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Error al cargar categorías:", data);
      throw new Error("Error al cargar categorías");
    }
    return data;
  }

  async obtener(id: number): Promise<CategoryResponse> {
    const res = await fetch(`${BASE_URL}/api/v1/categorias/${id}`, {
      headers: await this.getHeaders(),
    });
    if (!res.ok) throw new Error("Error al obtener categoría");
    return res.json();
  }

  async crear(request: CategoryRequest): Promise<CategoryResponse> {
    const res = await fetch(`${BASE_URL}/api/v1/categorias`, {
      method: "POST",
      headers: await this.getHeaders(),
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error("Error al crear categoría");
    return res.json();
  }

  async actualizar(
    id: number,
    request: CategoryRequest,
  ): Promise<CategoryResponse> {
    const res = await fetch(`${BASE_URL}/api/v1/categorias/${id}`, {
      method: "PUT",
      headers: await this.getHeaders(),
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error("Error al actualizar categoría");
    return res.json();
  }

  async eliminar(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/v1/categorias/${id}`, {
      method: "DELETE",
      headers: await this.getHeaders(),
    });
    if (!res.ok) throw new Error("Error al eliminar categoría");
  }
}
