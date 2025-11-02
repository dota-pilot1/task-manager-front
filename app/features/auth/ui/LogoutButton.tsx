'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/Button';
import { useAuthStore } from '@/shared/store/useAuthStore';

export function LogoutButton() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <Button variant="ghost" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}
