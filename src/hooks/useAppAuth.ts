import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, isPlaceholder } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useAppAuth = (): [User | null, boolean, Error | undefined] => {
  if (!isPlaceholder) {
    return useAuthState(auth);
  }

  // Mock implementation
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u: User | null) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return [user, loading, undefined];
};
