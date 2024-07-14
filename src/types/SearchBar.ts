import { State as AppState } from './App.ts';

export interface Props {
  onSearch: (state: AppState) => void;
}

export interface State {
  searchTerm: string;
}
