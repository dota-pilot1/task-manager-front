import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '../types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      login: (user: User, token: string) => {
        set({
          user,
          accessToken: token,
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
