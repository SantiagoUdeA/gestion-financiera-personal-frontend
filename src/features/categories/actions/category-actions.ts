import { CategoryRequest } from '@/types/category-api';
import { categoryService } from '../services';

export async function fetchCategoriesAction() {
  return categoryService.listar();
}

export async function createCategoryAction(request: CategoryRequest) {
  return categoryService.crear(request);
}

export async function updateCategoryAction(id: number, request: CategoryRequest) {
  return categoryService.actualizar(id, request);
}

export async function deleteCategoryAction(id: number) {
  return categoryService.eliminar(id);
}
