import { useEffect, useState } from 'react';
import { AuthResponse } from '@/types/auth';

export function getAuthData(): AuthResponse | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('auth');
  return stored ? (JSON.parse(stored) as AuthResponse) : null;
}

export function setAuthData(data: AuthResponse): void {
  localStorage.setItem('auth', JSON.stringify(data));
  document.cookie = `token=${data.token}; path=/; SameSite=Lax`;
}

export function clearAuthData(): void {
  localStorage.removeItem('auth');
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

export function useAuthUser() {
  const [user, setUser] = useState<AuthResponse | null>(null);
  useEffect(() => {
    setUser(getAuthData());
  }, []);
  return user;
}
