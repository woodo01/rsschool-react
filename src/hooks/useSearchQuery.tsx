import { useState, useEffect } from 'react';

const useSearchQuery = (key: string) => {
    const [query, setQuery] = useState<string>(() => {
        // Get initial value from local storage
        return localStorage.getItem(key) || '';
    });

    useEffect(() => {
        localStorage.setItem(key, query);
        // Save query to local storage when unmounting
        return () => {
            localStorage.setItem(key, query);
        };
    }, [key, query]);

    return [query, setQuery] as const;
};

export default useSearchQuery;
