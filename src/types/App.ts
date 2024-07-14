import { SearchItem } from './SearchResult.ts';

export interface State {
    items: SearchItem[];
    totalPages: number;
    loading: boolean;
    error: Error | null;
}
