import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import {
    api,
    useLazyFetchItemsQuery,
    useFetchItemDetailsQuery,
} from './apiSlice';

jest.mock('./apiSlice', () => ({
    ...jest.requireActual('./apiSlice'),
    useLazyFetchItemsQuery: jest.fn(),
    useFetchItemDetailsQuery: jest.fn(),
}));

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

interface Props {
    searchTerm: string;
    pageNumber: number;
}
const FetchItemsComponent = (props: Props) => {
    const [fetchItems, { data, isLoading, isError }] = useLazyFetchItemsQuery();

    React.useEffect(() => {
        fetchItems(props);
    }, [fetchItems, props.searchTerm, props.pageNumber]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;
    if (data)
        return (
            <div>
                {data.animals.map((animal) => (
                    <div key={animal.uid}>{animal.name}</div>
                ))}
            </div>
        );

    return null;
};

interface DetailProps {
    id: string;
}
const FetchItemDetailsComponent = (props: DetailProps) => {
    const { data, isLoading, isError } = useFetchItemDetailsQuery(props.id);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;
    if (data) return <div>{data.animal.name}</div>;

    return null;
};

describe('apiSlice', () => {
    beforeEach(() => {
        (useLazyFetchItemsQuery as jest.Mock).mockReturnValue([
            jest.fn(),
            {
                data: {
                    animals: [
                        { uid: '1', name: 'Mock Animal 1' },
                        { uid: '2', name: 'Mock Animal 2' },
                    ],
                    page: { totalPages: 2 },
                },
                isLoading: false,
                isError: false,
            },
        ]);

        (useFetchItemDetailsQuery as jest.Mock).mockReturnValue({
            data: { animal: { uid: '1', name: 'Mock Animal 1' } },
            isLoading: false,
            isError: false,
        });
    });

    test('fetches items with search term and page number', async () => {
        render(
            <Provider store={store}>
                <FetchItemsComponent searchTerm="test" pageNumber={1} />
            </Provider>,
        );

        await waitFor(() => {
            expect(screen.getByText('Mock Animal 1')).toBeInTheDocument();
            expect(screen.getByText('Mock Animal 2')).toBeInTheDocument();
        });
    });

    test('fetches item details by ID', async () => {
        render(
            <Provider store={store}>
                <FetchItemDetailsComponent id="1" />
            </Provider>,
        );

        await waitFor(() => {
            expect(screen.getByText('Mock Animal 1')).toBeInTheDocument();
        });
    });

    test('handles fetch items error', async () => {
        (useLazyFetchItemsQuery as jest.Mock).mockReturnValue([
            jest.fn(),
            {
                data: null,
                isLoading: false,
                isError: true,
            },
        ]);

        render(
            <Provider store={store}>
                <FetchItemsComponent searchTerm="test" pageNumber={1} />
            </Provider>,
        );

        await waitFor(() => {
            expect(screen.getByText('Error...')).toBeInTheDocument();
        });
    });

    test('handles fetch item details error', async () => {
        (useFetchItemDetailsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
        });

        render(
            <Provider store={store}>
                <FetchItemDetailsComponent id="1" />
            </Provider>,
        );

        await waitFor(() => {
            expect(screen.getByText('Error...')).toBeInTheDocument();
        });
    });
});
