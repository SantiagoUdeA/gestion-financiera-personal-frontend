import { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth';
import { IAuthService } from './IAuthService';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

export class AuthService implements IAuthService {
  async login(request: LoginRequest): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error('Credenciales inválidas');
    return res.json();
  }

  async register(request: RegisterRequest): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!res.ok) throw new Error('Error al registrar usuario');
    return res.json();
  }
}
