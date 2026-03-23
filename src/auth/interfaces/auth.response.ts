import type { User } from "@/interfaces/user.interface";

// Login, Register, AuthStatus
export interface AuthResponse {
  user: User;
  token: string;
}
