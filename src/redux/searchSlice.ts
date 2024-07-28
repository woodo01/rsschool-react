import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchItem } from '../types/SearchResult.ts';

export interface SearchState {
    items: SearchItem[];
    loading: boolean;
    totalPages: number;
    error: Error | null;
}

const initialState: SearchState = {
    items: [],
    loading: false,
    totalPages: 0,
    error: null,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchItems: (state, action: PayloadAction<SearchItem[]>) => {
            state.items = action.payload;
        },
        setError: (state, action: PayloadAction<Error>) => {
            state.error = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
    },
});

export const { setSearchItems, setError, setLoading, setTotalPages } =
    searchSlice.actions;
export default searchSlice.reducer;
