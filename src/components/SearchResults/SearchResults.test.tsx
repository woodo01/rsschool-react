import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import SearchResults from './SearchResults';
import { toggleItemSelected } from '../../redux/searchSlice';
import mockRouter from 'next-router-mock';

jest.mock('../../redux/searchSlice', () => ({
    ...jest.requireActual('../../redux/searchSlice'),
    toggleItemSelected: jest.fn(),
}));

const mockStore = configureStore([]);
jest.mock('next/router', () => require('next-router-mock'));

describe('SearchResults Component', () => {
    let store: MockStore;

    beforeEach(() => {
        store = mockStore({
            search: {
                items: [
                    { uid: '1', name: 'Item 1' },
                    { uid: '2', name: 'Item 2' },
                    { uid: '3', name: 'Item 3' },
                ],
                loading: false,
                totalPages: 2,
                selectedItems: {},
            },
        });
        store.dispatch = jest.fn();
    });

    test('renders the list of items correctly', () => {
        render(
            <Provider store={store}>
                <SearchResults />
            </Provider>,
        );

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    test('handles item selection via checkboxes', () => {
        render(
            <Provider store={store}>
                <SearchResults />
            </Provider>,
        );

        const checkbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(checkbox);
        expect(store.dispatch).toHaveBeenCalledWith(
            toggleItemSelected({ uid: '1', name: 'Item 1' }),
        );
    });

    test('navigates to item details page when an item is clicked', () => {
        render(
            <Provider store={store}>
                <SearchResults />
            </Provider>,
        );

        const item = screen.getByText('Item 1');
        fireEvent.click(item);
        expect(mockRouter).toMatchObject({
            asPath: '/details/1',
        });
    });

    test('displays the Flyout when there are selected items', () => {
        store = mockStore({
            search: {
                items: [
                    { uid: '1', name: 'Item 1' },
                    { uid: '2', name: 'Item 2' },
                ],
                loading: false,
                totalPages: 2,
                selectedItems: { '1': { uid: '1', name: 'Item 1' } },
            },
        });

        render(
            <Provider store={store}>
                <SearchResults />
            </Provider>,
        );

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('1 item(s) selected')).toBeInTheDocument(); // Assuming Flyout component displays selected items count
    });

    test('displays the Pagination component when there are items and loading is false', () => {
        render(
            <Provider store={store}>
                <SearchResults />
            </Provider>,
        );

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Page 1')).toBeInTheDocument();
    });
});
