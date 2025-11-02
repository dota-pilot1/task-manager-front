'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Spinner } from '@/shared/ui/Spinner';
import { useLoginMutation } from '../model';

const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLoginMutation();

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(''); // 제출 시 에러 초기화
    try {
      await loginMutation.mutateAsync(data);
      // 성공 시
      onSuccess?.();
      setTimeout(() => {
        router.replace('/dashboard');
      }, 100);
    } catch (error) {
      // 에러 발생 시 로컬 상태에 저장
      setErrorMessage('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="이메일"
        type="email"
        placeholder="example@email.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력하세요"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" disabled={loginMutation.isPending} className="w-full">
        {loginMutation.isPending ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner size="sm" color="white" />
            로그인 중...
          </div>
        ) : (
          '로그인'
        )}
      </Button>

      {errorMessage && (
        <div className="rounded-md bg-red-50 p-3">
          <p className="text-sm text-red-800">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
