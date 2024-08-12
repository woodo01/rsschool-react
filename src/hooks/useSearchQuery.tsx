import { useState, useEffect } from 'react';

const useSearchQuery = (key: string) => {
    const [query, setQuery] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(key) || '';
        }

        return '';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, query);
            return () => {
                localStorage.setItem(key, query);
            };
        }
    }, [key, query]);

    return [query, setQuery] as const;
};

export default useSearchQuery;
