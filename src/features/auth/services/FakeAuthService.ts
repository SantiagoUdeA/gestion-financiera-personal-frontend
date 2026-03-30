import { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth';
import { IAuthService } from './IAuthService';

const FAKE_USERS = [
  {
    email: 'demo@finanzas.com',
    contrasena: 'Demo@1234',
    primer_nombre: 'Carlos',
    apellido: 'Rodríguez',
    token: 'fake-jwt-token-demo',
  },
];

export class FakeAuthService implements IAuthService {
  async login(request: LoginRequest): Promise<AuthResponse> {
    await new Promise((r) => setTimeout(r, 600));
    const user = FAKE_USERS.find(
      (u) => u.email === request.email && u.contrasena === request.contrasena
    );
    if (!user) throw new Error('Credenciales inválidas');
    return { token: user.token, email: user.email, primer_nombre: user.primer_nombre };
  }

  async register(request: RegisterRequest): Promise<AuthResponse> {
    await new Promise((r) => setTimeout(r, 600));
    const exists = FAKE_USERS.find((u) => u.email === request.email);
    if (exists) throw new Error('El email ya está registrado');
    const newUser = { ...request, token: `fake-token-${Date.now()}` };
    FAKE_USERS.push(newUser);
    return { token: newUser.token, email: newUser.email, primer_nombre: newUser.primer_nombre };
  }
}
