export interface Category {
  id: number;
  nombre: string;
  tipo: 'INGRESO' | 'GASTO' | 'AMBOS';
  icono: string;
}

export const CATEGORIES: Category[] = [
  { id: 1, nombre: 'Salario', tipo: 'INGRESO', icono: '💼' },
  { id: 2, nombre: 'Freelance', tipo: 'INGRESO', icono: '💻' },
  { id: 3, nombre: 'Inversiones', tipo: 'INGRESO', icono: '📈' },
  { id: 4, nombre: 'Otros ingresos', tipo: 'INGRESO', icono: '💰' },
  { id: 5, nombre: 'Alimentación', tipo: 'GASTO', icono: '🍽️' },
  { id: 6, nombre: 'Transporte', tipo: 'GASTO', icono: '🚗' },
  { id: 7, nombre: 'Vivienda', tipo: 'GASTO', icono: '🏠' },
  { id: 8, nombre: 'Salud', tipo: 'GASTO', icono: '🏥' },
  { id: 9, nombre: 'Entretenimiento', tipo: 'GASTO', icono: '🎬' },
  { id: 10, nombre: 'Educación', tipo: 'GASTO', icono: '📚' },
  { id: 11, nombre: 'Ropa', tipo: 'GASTO', icono: '👗' },
  { id: 12, nombre: 'Servicios', tipo: 'GASTO', icono: '💡' },
];
