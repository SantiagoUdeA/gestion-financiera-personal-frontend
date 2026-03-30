export interface AuthResponse {
  token: string;
  email: string;
  primer_nombre: string;
}

export interface LoginRequest {
  email: string;
  contrasena: string;
}

export interface RegisterRequest {
  primer_nombre: string;
  apellido: string;
  email: string;
  contrasena: string;
}
