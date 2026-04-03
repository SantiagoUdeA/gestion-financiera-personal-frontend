'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CategoryRequest, CategoryResponse } from '@/types/category-api';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface CategoryFormProps {
  readonly onSubmit: (data: CategoryRequest) => Promise<void>;
  readonly saving: boolean;
  readonly editTarget?: CategoryResponse | null;
  readonly onCancel?: () => void;
}

export function CategoryForm({ onSubmit, saving, editTarget, onCancel }: CategoryFormProps) {
  const [form, setForm] = useState<CategoryRequest>({ nombre: '', tipo: 'GASTO' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (editTarget) {
      setForm({ nombre: editTarget.nombre, tipo: editTarget.tipo });
    } else {
      setForm({ nombre: '', tipo: 'GASTO' });
    }
    setError(null);
    setSuccess(false);
  }, [editTarget]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!form.nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }
    try {
      await onSubmit(form);
      setSuccess(true);
      if (!editTarget) setForm({ nombre: '', tipo: 'GASTO' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar categoría');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-3 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg p-3 text-sm">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Categoría {editTarget ? 'actualizada' : 'creada'} exitosamente
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="nombre" className="text-slate-300 text-sm">
          Nombre
        </Label>
        <Input
          id="nombre"
          type="text"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          className="bg-slate-700/50 border-slate-600 text-white focus:border-emerald-500"
          placeholder="Ej: Salario"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-slate-300 text-sm">Tipo</Label>
        <div className="grid grid-cols-2 gap-2">
          {(['INGRESO', 'GASTO'] as const).map((tipo) => (
            <button
              key={tipo}
              type="button"
              onClick={() => setForm({ ...form, tipo })}
              className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                form.tipo === tipo
                  ? tipo === 'INGRESO'
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                    : 'bg-red-500/20 border-red-500/50 text-red-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              {tipo === 'INGRESO' ? '↑ Ingreso' : '↓ Gasto'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white"
          >
            Cancelar
          </Button>
        )}
        <Button
          type="submit"
          disabled={saving}
          className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold"
        >
          {saving ? 'Guardando...' : editTarget ? 'Actualizar' : 'Crear categoría'}
        </Button>
      </div>
    </form>
  );
}
