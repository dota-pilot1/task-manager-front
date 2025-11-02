'use client';

import Link from 'next/link';
import { LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">로그인</h1>
        <LoginForm />
        <div className="mt-4 text-center text-sm">
          <Link href="/signup" className="text-blue-600 hover:underline">
            계정이 없으신가요? 회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
