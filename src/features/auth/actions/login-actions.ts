import { LoginRequest, RegisterRequest } from '@/types/auth';
import { authService } from '../services';

export async function loginAction(request: LoginRequest) {
  return authService.login(request);
}

export async function registerAction(request: RegisterRequest) {
  return authService.register(request);
}
