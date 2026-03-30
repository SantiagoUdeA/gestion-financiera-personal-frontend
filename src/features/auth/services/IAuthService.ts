import { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth';

export interface IAuthService {
  login(request: LoginRequest): Promise<AuthResponse>;
  register(request: RegisterRequest): Promise<AuthResponse>;
}
