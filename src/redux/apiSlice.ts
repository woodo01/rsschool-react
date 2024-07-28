import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchItem } from '../types/SearchResult';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v1/rest/' }),
    endpoints: (builder) => ({
        fetchItems: builder.query<
            { animals: SearchItem[]; page: { totalPages: number } },
            { searchTerm: string; pageNumber: number }
        >({
            query: ({ searchTerm, pageNumber }) => ({
                url: `animal/search?pageNumber=${pageNumber}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    name: searchTerm,
                }),
            }),
        }),
        fetchItemDetails: builder.query<{ animal: SearchItem }, string>({
            query: (id) => `animal/?uid=${id}`,
        }),
    }),
});

export const { useLazyFetchItemsQuery, useFetchItemDetailsQuery } = api;
