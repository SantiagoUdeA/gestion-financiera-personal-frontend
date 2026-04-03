'use client';

import { useEffect, useState } from 'react';
import {
  fetchCategoriesAction,
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from '@/features/categories/actions/category-actions';
import { CategoryForm } from '@/features/categories/components/CategoryForm';
import { CategoryList } from '@/features/categories/components/CategoryList';
import { CategoryRequest, CategoryResponse } from '@/types/category-api';
import { Plus } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<CategoryResponse | null>(null);

  useEffect(() => {
    fetchCategoriesAction()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (data: CategoryRequest) => {
    setSaving(true);
    try {
      const created = await createCategoryAction(data);
      setCategories((prev) => [...prev, created]);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (data: CategoryRequest) => {
    if (!editTarget) return;
    setSaving(true);
    try {
      const updated = await updateCategoryAction(editTarget.id, data);
      setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setEditTarget(null);
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeleting(id);
    try {
      await deleteCategoryAction(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = (category: CategoryResponse) => {
    setEditTarget(category);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditTarget(null);
    setShowForm(false);
  };

  const ingresos = categories.filter((c) => c.tipo === 'INGRESO').length;
  const gastos = categories.filter((c) => c.tipo === 'GASTO').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Categorías</h1>
          <p className="text-slate-400 mt-1 text-sm hidden sm:block">
            Organiza tus transacciones por categoría
          </p>
        </div>
        <button
          onClick={() => {
            setEditTarget(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nueva categoría</span>
          <span className="sm:hidden">Nueva</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'Total', value: categories.length, color: 'text-white' },
          { label: 'Ingresos', value: ingresos, color: 'text-emerald-400' },
          { label: 'Gastos', value: gastos, color: 'text-red-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-3 sm:p-4">
            <p className="text-slate-400 text-xs sm:text-sm">{label}</p>
            <p className={`text-base sm:text-xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {showForm && (
          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 sm:p-6">
            <h2 className="text-white font-semibold mb-4">
              {editTarget ? 'Editar categoría' : 'Nueva categoría'}
            </h2>
            <CategoryForm
              onSubmit={editTarget ? handleUpdate : handleCreate}
              saving={saving}
              editTarget={editTarget}
              onCancel={handleCancel}
            />
          </div>
        )}
        <div className={showForm ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 sm:p-6">
            <h2 className="text-white font-semibold mb-4">Listado</h2>
            <CategoryList
              categories={categories}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              deleting={deleting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
