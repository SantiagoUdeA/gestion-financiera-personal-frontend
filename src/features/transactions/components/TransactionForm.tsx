"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CATEGORIES } from "@/types/category";
import { TransactionRequest } from "@/types/transaction";
import { AlertCircle, CheckCircle2, ChevronDown } from "lucide-react";

interface TransactionFormProps {
  onSubmit: (data: TransactionRequest) => Promise<void>;
  creating: boolean;
}

export function TransactionForm({ onSubmit, creating }: TransactionFormProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [form, setForm] = useState<TransactionRequest>({
    tipo: "GASTO",
    monto: 0,
    fecha: new Date().toISOString().split("T")[0],
    categoriaId: 5,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const update = (field: string, value: string | number) =>
    setForm({ ...form, [field]: value });

  const filteredCategories = CATEGORIES.filter(
    (c) => c.tipo === form.tipo || c.tipo === "AMBOS",
  );

  const handleSubmit = async (e: React.FormEvent) => {
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
      setForm({
        tipo: "GASTO",
        monto: 0,
        fecha: new Date().toISOString().split("T")[0],
        categoriaId: 5,
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al crear transacción");
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
              onClick={() => {
                const defaultCat = tipo === "INGRESO" ? 1 : 5;
                setForm({ ...form, tipo, categoriaId: defaultCat });
              }}
              className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                form.tipo === tipo
                  ? tipo === "INGRESO"
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                    : "bg-red-500/20 border-red-500/50 text-red-400"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
              }`}
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
          step="100"
          value={form.monto || ""}
          onChange={(e) => update("monto", parseFloat(e.target.value) || 0)}
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
          onChange={(e) => update("fecha", e.target.value)}
          className="bg-slate-700/50 border-slate-600 text-white focus:border-emerald-500"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-slate-300 text-sm">Categoría</Label>
        <div className="relative">
          {(() => {
            const selected = filteredCategories.find((c) => c.id === form.categoriaId);
            const Icon = selected?.icono;
            return (
              <button
                type="button"
                onClick={() => setCategoryOpen((o) => !o)}
                className="w-full h-9 px-3 flex items-center justify-between rounded-md bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <span className="flex items-center gap-2">
                  {Icon && <Icon className="h-4 w-4 text-slate-400" />}
                  {selected?.nombre ?? "Seleccionar"}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
            );
          })()}
          {categoryOpen && (
            <ul className="absolute z-10 mt-1 w-full rounded-md bg-slate-800 border border-slate-700 shadow-lg max-h-48 overflow-y-auto">
              {filteredCategories.map((cat) => {
                const Icon = cat.icono;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => {
                        update("categoriaId", cat.id);
                        setCategoryOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-700 transition-colors ${
                        form.categoriaId === cat.id ? "text-emerald-400" : "text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {cat.nombre}
                    </button>
                  </li>
                );
              })}
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
