'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/store/useAuthStore';
import { useAuthValidationQuery } from '@/features/auth';
import { Spinner } from '@/shared/ui/Spinner';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';

export default function NotesPage() {
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
            <h1 className="mb-2 text-3xl font-bold text-gray-900">노트 공유</h1>
            <p className="text-gray-600">리치 에디터와 복잡한 트리 메뉴 구현</p>
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
              <div className="mb-4 text-purple-600">
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">노트 공유 기능</h3>
              <p className="mb-6 text-center text-gray-600">
                리치 에디터와 트리 메뉴를 활용한 노트 관리 기능을 구현할 예정입니다.
              </p>
              <div className="w-full max-w-md space-y-2 text-left">
                <div className="rounded-lg bg-purple-50 p-3">
                  <p className="text-sm font-medium text-purple-900">학습 목표</p>
                  <ul className="mt-2 space-y-1 text-sm text-purple-700">
                    <li>• 리치 에디터를 활용한 문서 작성</li>
                    <li>• 트리 구조의 폴더 및 노트 관리</li>
                    <li>• 드래그 앤 드롭으로 구조 변경</li>
                    <li>• 노트 공유 및 권한 관리</li>
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
