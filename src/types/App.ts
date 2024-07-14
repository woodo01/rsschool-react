import { SearchItem } from './SearchResult.ts';

export interface State {
  items: SearchItem[];
  loading: boolean;
  error: Error | null;
}
