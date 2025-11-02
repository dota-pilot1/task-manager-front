import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor - accessToken 자동 첨부
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const authStore = localStorage.getItem('auth-storage');
      if (authStore) {
        try {
          const parsed = JSON.parse(authStore);
          const token = parsed.state?.accessToken;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Failed to parse auth storage:', error);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - 토큰 만료 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 로그인/회원가입 요청은 제외 (이미 로그인 폼에서 처리)
      const url = error.config?.url || '';
      const isAuthRequest = url.includes('/api/auth/login') ||
                            url.includes('/api/auth/signup');

      if (!isAuthRequest && typeof window !== 'undefined') {
        // 토큰 만료 시 로그아웃 처리하고 로그인 페이지로 이동
        localStorage.removeItem('auth-storage');

        // 현재 로그인 페이지가 아닌 경우에만 리다이렉트 (무한 루프 방지)
        if (!window.location.pathname.startsWith('/login')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
