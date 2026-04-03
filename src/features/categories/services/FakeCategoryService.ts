import { CategoryRequest, CategoryResponse } from '@/types/category-api';
import { ICategoryService } from './ICategoryService';

let FAKE_CATEGORIES: CategoryResponse[] = [
  { id: 1, nombre: 'Salario', tipo: 'INGRESO' },
  { id: 2, nombre: 'Freelance', tipo: 'INGRESO' },
  { id: 3, nombre: 'Inversiones', tipo: 'INGRESO' },
  { id: 4, nombre: 'Otros ingresos', tipo: 'INGRESO' },
  { id: 5, nombre: 'Alimentación', tipo: 'GASTO' },
  { id: 6, nombre: 'Transporte', tipo: 'GASTO' },
  { id: 7, nombre: 'Vivienda', tipo: 'GASTO' },
  { id: 8, nombre: 'Salud', tipo: 'GASTO' },
  { id: 9, nombre: 'Entretenimiento', tipo: 'GASTO' },
  { id: 10, nombre: 'Educación', tipo: 'GASTO' },
  { id: 11, nombre: 'Ropa', tipo: 'GASTO' },
  { id: 12, nombre: 'Servicios', tipo: 'GASTO' },
];

let nextId = 13;

const delay = () => new Promise((r) => setTimeout(r, 300));

export class FakeCategoryService implements ICategoryService {
  async listar(): Promise<CategoryResponse[]> {
    await delay();
    return [...FAKE_CATEGORIES];
  }

  async obtener(id: number): Promise<CategoryResponse> {
    await delay();
    const cat = FAKE_CATEGORIES.find((c) => c.id === id);
    if (!cat) throw new Error('Categoría no encontrada');
    return { ...cat };
  }

  async crear(request: CategoryRequest): Promise<CategoryResponse> {
    await delay();
    const nueva: CategoryResponse = { id: nextId++, ...request };
    FAKE_CATEGORIES = [...FAKE_CATEGORIES, nueva];
    return nueva;
  }

  async actualizar(id: number, request: CategoryRequest): Promise<CategoryResponse> {
    await delay();
    const idx = FAKE_CATEGORIES.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Categoría no encontrada');
    const updated: CategoryResponse = { id, ...request };
    FAKE_CATEGORIES = FAKE_CATEGORIES.map((c) => (c.id === id ? updated : c));
    return updated;
  }

  async eliminar(id: number): Promise<void> {
    await delay();
    FAKE_CATEGORIES = FAKE_CATEGORIES.filter((c) => c.id !== id);
  }
}
