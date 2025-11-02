'use client';

import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/shared/lib/api/authApi';
import { useAuthStore } from '@/shared/store/useAuthStore';

export function useAuthValidationQuery() {
  const { accessToken, login, logout } = useAuthStore();

  return useQuery({
    queryKey: ['auth', 'validate'],
    queryFn: async () => {
      try {
        const user = await authApi.getProfile();
        return user;
      } catch (error) {
        logout();
        throw error;
      }
    },
    enabled: !!accessToken, // 토큰이 있을 때만 실행
    retry: false,
    staleTime: 1000 * 60 * 5, // 5분
  });
}
