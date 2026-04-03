'use client';

import { useState } from 'react';
import { CategoryResponse } from '@/types/category-api';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Pencil, Trash2 } from 'lucide-react';

interface CategoryListProps {
  readonly categories: CategoryResponse[];
  readonly loading: boolean;
  readonly onEdit: (category: CategoryResponse) => void;
  readonly onDelete: (id: number) => void;
  readonly deleting: number | null;
}

export function CategoryList({ categories, loading, onEdit, onDelete, deleting }: CategoryListProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'TODOS' | 'INGRESO' | 'GASTO'>('TODOS');

  const filtered = categories.filter((c) => {
    const matchSearch = c.nombre.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'TODOS' || c.tipo === filter;
    return matchSearch && matchFilter;
  });

  if (loading) {
    return (
      <div className="space-y-3">
        {new Array(5).fill(null).map((_, i) => (
          <div key={i} className="h-14 bg-slate-700/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar categoría..."
            className="pl-9 bg-slate-700/50 border-slate-600 text-white focus:border-emerald-500"
          />
        </div>
        <div className="flex gap-2">
          {(['TODOS', 'INGRESO', 'GASTO'] as const).map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFilter(tipo)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                filter === tipo
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-8">No hay categorías</p>
      ) : (
        <ul className="space-y-2">
          {filtered.map((cat) => (
            <li
              key={cat.id}
              className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-800/40 rounded-lg border border-slate-700/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Badge
                  className={`shrink-0 text-xs font-medium border ${
                    cat.tipo === 'INGRESO'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}
                >
                  {cat.tipo}
                </Badge>
                <span className="text-white text-sm truncate">{cat.nombre}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => onEdit(cat)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Editar"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(cat.id)}
                  disabled={deleting === cat.id}
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                  aria-label="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
