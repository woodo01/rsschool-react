import { SearchItem } from '../types/SearchResult.ts';

export const convertToCSV = (items: SearchItem[]): string => {
    const headers = ['UID', 'Name'];

    const rows = items.map((item) => [item.uid, item.name]);

    return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
};
