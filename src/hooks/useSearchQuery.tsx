import { useState, useEffect } from 'react';

export const useSearchQuery = (key: string) => {
  const [value, setValue] = useState(() => localStorage.getItem(key) || '');

  useEffect(() => {
    return () => {
      localStorage.setItem(key, value);
    };
  }, [key, value]);

  return [value, setValue] as const;
};
