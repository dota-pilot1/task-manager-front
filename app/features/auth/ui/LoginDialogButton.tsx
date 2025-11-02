'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { AuthDialog } from './AuthDialog';

export function LoginDialogButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setIsOpen(true)}>
        로그인
      </Button>
      <AuthDialog isOpen={isOpen} onClose={() => setIsOpen(false)} initialMode="login" />
    </>
  );
}
