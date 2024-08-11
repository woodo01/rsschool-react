import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import {
    setLoading,
    setSearchItems,
    setTotalPages,
} from '../../redux/searchSlice';
import { useLazyFetchItemsQuery } from '../../redux/apiSlice';
import useSearchQuery from '../../hooks/useSearchQuery';

jest.mock('../../redux/apiSlice', () => ({
    ...jest.requireActual('../../../components/redux/apiSlice'),
    useLazyFetchItemsQuery: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../../hooks/useSearchQuery');

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

describe('SearchBar Component', () => {
    let store: MockStore;

    beforeEach(() => {
        store = mockStore({});
        store.dispatch = jest.fn();
        (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
        (useSearchQuery as jest.Mock).mockReturnValue(['', jest.fn()]);
    });

    test('renders correctly', () => {
        const fetchItems = jest.fn();
        (useLazyFetchItemsQuery as jest.Mock).mockReturnValue([
            fetchItems,
            { data: null, error: null, isLoading: false },
        ]);
        (useSearchQuery as jest.Mock).mockReturnValue(['test', jest.fn()]);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SearchBar />
                </MemoryRouter>
            </Provider>,
        );

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /search/i }),
        ).toBeInTheDocument();
    });

    test('handles input change', () => {
        const setSearchTerm = jest.fn();
        (useSearchQuery as jest.Mock).mockReturnValue(['test', setSearchTerm]);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SearchBar />
                </MemoryRouter>
            </Provider>,
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'new search term' } });
        expect(setSearchTerm).toHaveBeenCalledWith('new search term');
    });

    test('fetches items on mount and when location.search changes', async () => {
        const fetchItems = jest.fn();
        (useLazyFetchItemsQuery as jest.Mock).mockReturnValue([
            fetchItems,
            { data: null, error: null, isLoading: false },
        ]);
        (useSearchQuery as jest.Mock).mockReturnValue(['', jest.fn()]);

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/?page=1']}>
                    <SearchBar />
                </MemoryRouter>
            </Provider>,
        );

        await waitFor(() => {
            expect(fetchItems).toHaveBeenCalledWith({
                searchTerm: '',
                pageNumber: 0,
            });
        });
    });

    test('dispatches actions on data fetch', async () => {
        const fetchItems = jest.fn();
        (useLazyFetchItemsQuery as jest.Mock).mockReturnValue([
            fetchItems,
            {
                data: { animals: [], page: { totalPages: 1 } },
                error: null,
                isLoading: false,
            },
        ]);
        (useSearchQuery as jest.Mock).mockReturnValue(['', jest.fn()]);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SearchBar />
                </MemoryRouter>
            </Provider>,
        );

        await waitFor(() => {
            expect(store.dispatch).toHaveBeenCalledWith(setSearchItems([]));
            expect(store.dispatch).toHaveBeenCalledWith(setTotalPages(1));
            expect(store.dispatch).toHaveBeenCalledWith(setLoading(false));
        });
    });

    test('handles search button click', () => {
        const fetchItems = jest.fn();
        (useLazyFetchItemsQuery as jest.Mock).mockReturnValue([
            fetchItems,
            { data: null, error: null, isLoading: false },
        ]);
        (useSearchQuery as jest.Mock).mockReturnValue(['test', jest.fn()]);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SearchBar />
                </MemoryRouter>
            </Provider>,
        );

        fireEvent.click(screen.getByRole('button', { name: /search/i }));
        expect(mockNavigate).toHaveBeenCalledWith(`/`);
        expect(fetchItems).toHaveBeenCalledWith({
            searchTerm: 'test',
            pageNumber: 0,
        });
    });
});
