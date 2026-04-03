import { FakeCategoryService } from './FakeCategoryService';
import { CategoryService } from './CategoryService';

const USE_FAKE = process.env.NEXT_PUBLIC_USE_FAKE_SERVICES !== 'false';

export const categoryService = USE_FAKE
  ? new FakeCategoryService()
  : new CategoryService();

export type { ICategoryService } from './ICategoryService';
