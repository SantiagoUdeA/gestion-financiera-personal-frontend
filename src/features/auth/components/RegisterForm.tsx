'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { registerAction } from '../actions/login-actions';
import { setAuthData } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, AlertCircle, Eye, EyeOff } from 'lucide-react';

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    primer_nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await registerAction(form);
      setAuthData(data);
      router.push('/dashboard');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="bg-emerald-500 p-2 rounded-xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">FinanzasPro</span>
          </div>
          <p className="text-slate-400 text-sm">Crea tu cuenta y toma el control</p>
        </div>
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-xl">Crear cuenta</CardTitle>
            <CardDescription className="text-slate-400">
              Completa tus datos para comenzar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-3 text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="primer_nombre" className="text-slate-300 text-sm">
                    Nombre
                  </Label>
                  <Input
                    id="primer_nombre"
                    value={form.primer_nombre}
                    onChange={(e) => update('primer_nombre', e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500"
                    placeholder="Juan"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="apellido" className="text-slate-300 text-sm">
                    Apellido
                  </Label>
                  <Input
                    id="apellido"
                    value={form.apellido}
                    onChange={(e) => update('apellido', e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500"
                    placeholder="Pérez"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-300 text-sm">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contrasena" className="text-slate-300 text-sm">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="contrasena"
                    type={showPassword ? 'text' : 'password'}
                    value={form.contrasena}
                    onChange={(e) => update('contrasena', e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 pr-10"
                    placeholder="Min. 8 chars, mayúscula, número, especial"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-slate-500">Debe tener mayúscula, número y carácter especial</p>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold h-10 mt-2"
              >
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
              </Button>
              <p className="text-center text-slate-400 text-sm">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
                  Inicia sesión
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
