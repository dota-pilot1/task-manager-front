'use client';

import { useAuthStore } from '@/shared/store/useAuthStore';
import { LoginDialogButton, SignupDialogButton, LogoutButton } from '@/features/auth';

export function AuthSectionForHeader() {
  const { user, isAuthenticated } = useAuthStore();

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">{user.email}</span>
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <LoginDialogButton />
      <SignupDialogButton />
    </div>
  );
}
