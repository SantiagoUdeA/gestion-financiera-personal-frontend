'use client';

import { useState } from 'react';
import { RegisterRequest } from '@/types/auth';
import { authService } from '../services';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthContext();
  const router = useRouter();

  const handleRegister = async (request: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.register(request);
      login(data);
      router.push('/dashboard');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, error };
}
