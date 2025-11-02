'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/store/useAuthStore';
import { useAuthValidationQuery } from '@/features/auth';
import { Spinner } from '@/shared/ui/Spinner';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';

export default function UsersPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { isLoading } = useAuthValidationQuery();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">유저 관리</h1>
            <p className="text-gray-600">Spring Security를 활용한 사용자 관리 시스템</p>
          </div>
          <Button variant="ghost" onClick={() => router.push('/dashboard')}>
            ← 대시보드로 돌아가기
          </Button>
        </div>

        {/* 컨텐츠 */}
        <Card>
          <CardHeader>
            <CardTitle>준비 중입니다</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-24 w-24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">유저 관리 기능</h3>
              <p className="mb-6 text-center text-gray-600">
                Spring Security를 활용한 사용자 관리 기능을 구현할 예정입니다.
              </p>
              <div className="w-full max-w-md space-y-2 text-left">
                <div className="rounded-lg bg-green-50 p-3">
                  <p className="text-sm font-medium text-green-900">학습 목표</p>
                  <ul className="mt-2 space-y-1 text-sm text-green-700">
                    <li>• 사용자 목록 조회 및 검색</li>
                    <li>• 권한(Role) 기반 접근 제어</li>
                    <li>• 사용자 정보 수정 및 삭제</li>
                    <li>• 관리자 전용 기능 구현</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
