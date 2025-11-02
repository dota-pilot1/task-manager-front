'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/store/useAuthStore';
import { useAuthValidationQuery } from '@/features/auth';
import { Spinner } from '@/shared/ui/Spinner';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';

export default function NotificationsPage() {
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
            <h1 className="mb-2 text-3xl font-bold text-gray-900">알림 센터</h1>
            <p className="text-gray-600">실시간 이벤트와 메시지 알림</p>
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
              <div className="mb-4 text-yellow-600">
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
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">알림 센터</h3>
              <p className="mb-6 text-center text-gray-600">
                실시간 알림 및 이벤트 관리 기능을 구현할 예정입니다.
              </p>
              <div className="w-full max-w-md space-y-2 text-left">
                <div className="rounded-lg bg-yellow-50 p-3">
                  <p className="text-sm font-medium text-yellow-900">학습 목표</p>
                  <ul className="mt-2 space-y-1 text-sm text-yellow-700">
                    <li>• 실시간 알림 수신 (WebSocket/SSE)</li>
                    <li>• 알림 타입별 분류 및 필터링</li>
                    <li>• 읽음/안읽음 상태 관리</li>
                    <li>• 알림 설정 및 구독 관리</li>
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
