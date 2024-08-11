import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './apiSlice.ts';
import searchReducer from './searchSlice.ts';
import themeReducer from './themeSlice.ts';

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        search: searchReducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
