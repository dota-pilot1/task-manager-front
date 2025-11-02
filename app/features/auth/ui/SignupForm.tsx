'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Spinner } from '@/shared/ui/Spinner';
import { useSignupMutation } from '../model';

const signupSchema = z
  .object({
    name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
    email: z.string().email('유효한 이메일을 입력하세요'),
    password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSuccess?: () => void;
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const signupMutation = useSignupMutation();

  const onSubmit = async (data: SignupFormData) => {
    setErrorMessage(''); // 제출 시 에러 초기화
    try {
      const { passwordConfirm, ...signupData } = data;
      await signupMutation.mutateAsync(signupData);
      // 성공 시에만 페이지 이동
      onSuccess?.();
      setTimeout(() => {
        router.replace('/dashboard');
      }, 100);
    } catch (error) {
      // 에러 발생 시 로컬 상태에 저장
      setErrorMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="이름"
        type="text"
        placeholder="홍길동"
        error={errors.name?.message}
        {...register('name')}
      />

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

      <Input
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력하세요"
        error={errors.passwordConfirm?.message}
        {...register('passwordConfirm')}
      />

      <Button type="submit" disabled={signupMutation.isPending} className="w-full">
        {signupMutation.isPending ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner size="sm" color="white" />
            가입 중...
          </div>
        ) : (
          '회원가입'
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
