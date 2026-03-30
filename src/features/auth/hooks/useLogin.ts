'use client';

import { useState } from 'react';
import { LoginRequest } from '@/types/auth';
import { authService } from '../services';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthContext();
  const router = useRouter();

  const handleLogin = async (request: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(request);
      login(data);
      router.push('/dashboard');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}
