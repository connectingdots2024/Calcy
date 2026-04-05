import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, isPlaceholder } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useAppAuth = (): [User | null, boolean, Error | undefined] => {
  // Only call useAuthState if we have a real auth instance
  const [realUser, realLoading, realError] = !isPlaceholder ? useAuthState(auth) : [null, false, undefined];
  
  // Mock implementation state
  const [mockUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('mock_user');
    return saved ? JSON.parse(saved) : null;
  });

  if (mockUser) return [mockUser, false, undefined];
  
  if (!isPlaceholder) {
    return [realUser, realLoading, realError];
  }

  return [null, false, undefined];
};
