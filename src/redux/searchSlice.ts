import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchItem } from '../types/SearchResult.ts';

export interface SearchState {
    items: SearchItem[];
    loading: boolean;
    totalPages: number;
    error: Error | null;
    selectedItems: { [key: string]: SearchItem };
}

const initialState: SearchState = {
    items: [],
    loading: false,
    totalPages: 0,
    error: null,
    selectedItems: {},
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
        toggleItemSelected: (state, action: PayloadAction<SearchItem>) => {
            if (action.payload.uid in state.selectedItems) {
                delete state.selectedItems[action.payload.uid];
            } else {
                state.selectedItems[action.payload.uid] = action.payload;
            }
        },
        unselectAllItems: (state) => {
            state.selectedItems = {};
        },
    },
});

export const {
    setSearchItems,
    setError,
    setLoading,
    setTotalPages,
    toggleItemSelected,
    unselectAllItems,
} = searchSlice.actions;
export default searchSlice.reducer;
