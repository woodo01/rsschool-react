import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
    theme: string;
}

const initialState: ThemeState = {
    theme: 'light', // default theme
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
