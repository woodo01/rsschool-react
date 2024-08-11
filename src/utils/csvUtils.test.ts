import { convertToCSV } from './csvUtils.ts';
import { SearchItem } from '../types/SearchResult.ts';

describe('convertToCSV', () => {
    test('converts an empty array to CSV', () => {
        const items: SearchItem[] = [];
        const result = convertToCSV(items);
        expect(result).toBe('UID,Name');
    });

    test('converts a single item to CSV', () => {
        const items: SearchItem[] = [{ uid: '1', name: 'Item 1' }];
        const result = convertToCSV(items);
        expect(result).toBe('UID,Name\n1,Item 1');
    });

    test('converts multiple items to CSV', () => {
        const items: SearchItem[] = [
            { uid: '1', name: 'Item 1' },
            { uid: '2', name: 'Item 2' },
        ];
        const result = convertToCSV(items);
        expect(result).toBe('UID,Name\n1,Item 1\n2,Item 2');
    });
});
