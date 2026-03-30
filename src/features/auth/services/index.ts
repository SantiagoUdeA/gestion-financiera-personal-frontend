import { FakeAuthService } from './FakeAuthService';
import { AuthService } from './AuthService';

const USE_FAKE = process.env.NEXT_PUBLIC_USE_FAKE_SERVICES !== 'false';

export const authService = USE_FAKE ? new FakeAuthService() : new AuthService();
export type { IAuthService } from './IAuthService';
