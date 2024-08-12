import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import ItemDetails from './ItemDetails';
import { useFetchItemDetailsQuery } from '../../redux/apiSlice';
import mockRouter from 'next-router-mock';

jest.mock('../../redux/apiSlice', () => ({
    ...jest.requireActual('../../redux/apiSlice'),
    useFetchItemDetailsQuery: jest.fn(),
}));

const mockStore = configureStore([]);
jest.mock('next/router', () => require('next-router-mock'));

describe('ItemDetails Component', () => {
    let store: MockStore;

    beforeEach(() => {
        store = mockStore({});
        store.dispatch = jest.fn();
    });

    test('renders loading state correctly', () => {
        (useFetchItemDetailsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
        });

        render(
            <Provider store={store}>
                <ItemDetails />
            </Provider>,
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('displays item details when data is available', () => {
        (useFetchItemDetailsQuery as jest.Mock).mockReturnValue({
            data: { animal: { name: 'Test Animal' } },
            isLoading: false,
        });

        render(
            <Provider store={store}>
                <ItemDetails />
            </Provider>,
        );

        expect(screen.getByText('Test Animal')).toBeInTheDocument();
    });

    test('displays a message when no data is available', () => {
        (useFetchItemDetailsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
        });

        render(
            <Provider store={store}>
                <ItemDetails />
            </Provider>,
        );

        expect(screen.getByText('No details available')).toBeInTheDocument();
    });

    test('navigates back when "Close" button is clicked', () => {
        (useFetchItemDetailsQuery as jest.Mock).mockReturnValue({
            data: { animal: { name: 'Test Animal' } },
            isLoading: false,
        });

        render(
            <Provider store={store}>
                <ItemDetails />
            </Provider>,
        );

        fireEvent.click(screen.getByText('Close'));
        expect(mockRouter).toMatchObject({
            asPath: '/',
        });
    });
});
