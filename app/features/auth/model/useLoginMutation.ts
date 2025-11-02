'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/shared/lib/api/authApi';
import { useAuthStore } from '@/shared/store/useAuthStore';
import type { LoginRequest } from '@/shared/types/auth';

export function useLoginMutation() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      // Zustand 스토어 업데이트
      login(response.user, response.accessToken);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
}
