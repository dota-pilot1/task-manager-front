'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { AuthDialog } from './AuthDialog';

export function SignupDialogButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        회원가입
      </Button>
      <AuthDialog isOpen={isOpen} onClose={() => setIsOpen(false)} initialMode="signup" />
    </>
  );
}
