import { act, renderHook } from '@testing-library/react';
import useSearchQuery from './useSearchQuery';

describe('useSearchQuery', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should initialize with a value from localStorage', () => {
        localStorage.setItem('searchTerm', 'initial value');
        const { result } = renderHook(() => useSearchQuery('searchTerm'));
        const [searchTerm] = result.current;
        expect(searchTerm).toBe('initial value');
    });

    test('should update the value and store it in localStorage', () => {
        const { result } = renderHook(() => useSearchQuery('searchTerm'));
        const [, setSearchTerm] = result.current;

        act(() => {
            setSearchTerm('new value');
        });

        const [updatedSearchTerm] = result.current;
        expect(updatedSearchTerm).toBe('new value');
        expect(localStorage.getItem('searchTerm')).toBe('new value');
    });

    test('should persist the value to localStorage on unmount', () => {
        const { result, unmount } = renderHook(() =>
            useSearchQuery('searchTerm'),
        );
        const [, setSearchTerm] = result.current;

        act(() => {
            setSearchTerm('persisted value');
        });

        unmount();

        expect(localStorage.getItem('searchTerm')).toBe('persisted value');
    });
});
