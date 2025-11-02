'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/shared/lib/api/authApi';
import { useAuthStore } from '@/shared/store/useAuthStore';
import type { SignupRequest } from '@/shared/types/auth';

export function useSignupMutation() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
    onSuccess: (response) => {
      // 회원가입 성공 시 자동 로그인
      login(response.user, response.accessToken);
    },
    onError: (error) => {
      console.error('Signup failed:', error);
    },
  });
}
