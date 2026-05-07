"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchCategoriesAction } from "@/features/categories/actions/category-actions";
import { CategoryResponse } from "@/types/category-api";
import { TransactionRequest } from "@/types/transaction";
import { AlertCircle, CheckCircle2, ChevronDown } from "lucide-react";

interface TransactionFormProps {
  readonly onSubmit: (data: TransactionRequest) => Promise<void>;
  readonly creating: boolean;
}

function tipoBtnClass(selected: boolean, tipo: "INGRESO" | "GASTO"): string {
  if (!selected) return "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600";
  return tipo === "INGRESO"
    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
    : "bg-red-500/20 border-red-500/50 text-red-400";
}

export function TransactionForm({ onSubmit, creating }: TransactionFormProps) {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [form, setForm] = useState<TransactionRequest>({
    tipo: "GASTO",
    monto: 0,
    categoriaId: 0,
    fecha: new Date().toISOString().split("T")[0],
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchCategoriesAction().then((cats) => {
      setCategories(cats);
      const firstGasto = cats.find((c) => c.tipo === "GASTO");
      if (firstGasto) setForm((f) => ({ ...f, categoriaId: firstGasto.id }));
    });
  }, []);

  const filteredCategories = categories.filter((c) => c.tipo === form.tipo);

  const handleTipoChange = (tipo: "INGRESO" | "GASTO") => {
    const first = categories.find((c) => c.tipo === tipo);
    setForm({ ...form, tipo, categoriaId: first?.id ?? 0 });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!form.monto || form.monto <= 0) {
      setError("El monto debe ser mayor a 0");
      return;
    }
    try {
      await onSubmit(form);
      setSuccess(true);
      const first = categories.find((c) => c.tipo === "GASTO");
      setForm({
        tipo: "GASTO",
        monto: 0,
        categoriaId: first?.id ?? 0,
        fecha: new Date().toISOString().split("T")[0],
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al crear transacción");
    }
  };

  const selectedCategory = filteredCategories.find((c) => c.id === form.categoriaId);

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
          Transacción creada exitosamente
        </div>
      )}

      <div className="space-y-1.5">
        <Label className="text-slate-300 text-sm">Tipo</Label>
        <div className="grid grid-cols-2 gap-2">
          {(["INGRESO", "GASTO"] as const).map((tipo) => (
            <button
              key={tipo}
              type="button"
              onClick={() => handleTipoChange(tipo)}
              className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${tipoBtnClass(form.tipo === tipo, tipo)}`}
            >
              {tipo === "INGRESO" ? "↑ Ingreso" : "↓ Gasto"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="monto" className="text-slate-300 text-sm">
          Monto (COP)
        </Label>
        <Input
          id="monto"
          type="number"
          min="1"
          value={form.monto || ""}
          onChange={(e) => setForm({ ...form, monto: Number.parseFloat(e.target.value) || 0 })}
          className="bg-slate-700/50 border-slate-600 text-white focus:border-emerald-500"
          placeholder="0"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="fecha" className="text-slate-300 text-sm">
          Fecha
        </Label>
        <Input
          id="fecha"
          type="date"
          value={form.fecha}
          onChange={(e) => setForm({ ...form, fecha: e.target.value })}
          className="bg-slate-700/50 border-slate-600 text-white focus:border-emerald-500"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-slate-300 text-sm">Categoría</Label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setCategoryOpen((o) => !o)}
            className="w-full h-9 px-3 flex items-center justify-between rounded-md bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500"
          >
            <span>{selectedCategory?.nombre ?? "Seleccionar"}</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
          {categoryOpen && (
            <ul className="absolute z-10 mt-1 w-full rounded-md bg-slate-800 border border-slate-700 shadow-lg max-h-48 overflow-y-auto">
              {filteredCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setForm({ ...form, categoriaId: cat.id });
                      setCategoryOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-700 transition-colors ${
                      form.categoriaId === cat.id ? "text-emerald-400" : "text-white"
                    }`}
                  >
                    {cat.nombre}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={creating}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold"
      >
        {creating ? "Guardando..." : "Registrar transacción"}
      </Button>
    </form>
  );
}
