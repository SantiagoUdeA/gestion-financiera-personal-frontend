import {
  Briefcase,
  Laptop,
  TrendingUp,
  DollarSign,
  Utensils,
  Car,
  Home,
  Heart,
  Film,
  BookOpen,
  Shirt,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export interface Category {
  id: number;
  nombre: string;
  tipo: 'INGRESO' | 'GASTO' | 'AMBOS';
  icono: LucideIcon;
}

export const CATEGORIES: Category[] = [
  { id: 1, nombre: 'Salario', tipo: 'INGRESO', icono: Briefcase },
  { id: 2, nombre: 'Freelance', tipo: 'INGRESO', icono: Laptop },
  { id: 3, nombre: 'Inversiones', tipo: 'INGRESO', icono: TrendingUp },
  { id: 4, nombre: 'Otros ingresos', tipo: 'INGRESO', icono: DollarSign },
  { id: 5, nombre: 'Alimentación', tipo: 'GASTO', icono: Utensils },
  { id: 6, nombre: 'Transporte', tipo: 'GASTO', icono: Car },
  { id: 7, nombre: 'Vivienda', tipo: 'GASTO', icono: Home },
  { id: 8, nombre: 'Salud', tipo: 'GASTO', icono: Heart },
  { id: 9, nombre: 'Entretenimiento', tipo: 'GASTO', icono: Film },
  { id: 10, nombre: 'Educación', tipo: 'GASTO', icono: BookOpen },
  { id: 11, nombre: 'Ropa', tipo: 'GASTO', icono: Shirt },
  { id: 12, nombre: 'Servicios', tipo: 'GASTO', icono: Zap },
];
