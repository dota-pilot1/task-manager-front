'use client';

import { useState } from 'react';
import { Dialog } from '@/shared/ui/Dialog';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export function AuthDialog({ isOpen, onClose, initialMode = 'login' }: AuthDialogProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  const handleSuccess = () => {
    onClose();
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'login' ? '로그인' : '회원가입'}
      closeOnOverlayClick={false}
    >
      {mode === 'login' ? (
        <LoginForm onSuccess={handleSuccess} />
      ) : (
        <SignupForm onSuccess={handleSuccess} />
      )}

      <div className="mt-4 text-center text-sm">
        <button
          type="button"
          onClick={toggleMode}
          className="text-blue-600 hover:underline"
        >
          {mode === 'login'
            ? '계정이 없으신가요? 회원가입'
            : '이미 계정이 있으신가요? 로그인'}
        </button>
      </div>
    </Dialog>
  );
}
