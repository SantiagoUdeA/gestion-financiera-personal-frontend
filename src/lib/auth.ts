import { useEffect, useState } from 'react';
import { AuthResponse } from '@/types/auth';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export function getAuthData(): AuthResponse | null {
  if (typeof window === 'undefined') return null;
  const stored = getCookie('auth');
  return stored ? (JSON.parse(stored) as AuthResponse) : null;
}

export function clearAuthData(): void {
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

export function useAuthUser() {
  const [user, setUser] = useState<AuthResponse | null>(null);
  useEffect(() => {
    setUser(getAuthData());
  }, []);
  return user;
}
