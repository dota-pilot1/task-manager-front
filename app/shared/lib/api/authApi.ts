import { axiosInstance } from '../axios';
import type {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  User,
} from '../../types/auth';

export const authApi = {
  // 로그인
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/api/auth/login', data);
    return response.data;
  },

  // 회원가입
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/api/auth/signup', data);
    return response.data;
  },

  // 프로필 조회 (JWT 검증)
  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get<User>('/api/auth/me');
    return response.data;
  },
};
