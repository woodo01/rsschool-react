import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import ItemDetails from './ItemDetails';
import { useFetchItemDetailsQuery } from '../../redux/apiSlice';

jest.mock('../../redux/apiSlice', () => ({
    ...jest.requireActual('../../redux/apiSlice'),
    useFetchItemDetailsQuery: jest.fn(),
}));

const mockStore = configureStore([]);

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
                <MemoryRouter initialEntries={['/details/1']}>
                    <Routes>
                        <Route path="/details/:id" element={<ItemDetails />} />
                        <Route path="/" element={<div>Home Page</div>} />
                    </Routes>
                </MemoryRouter>
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
                <MemoryRouter initialEntries={['/details/1']}>
                    <Routes>
                        <Route path="/details/:id" element={<ItemDetails />} />
                        <Route path="/" element={<div>Home Page</div>} />
                    </Routes>
                </MemoryRouter>
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
                <MemoryRouter initialEntries={['/details/1']}>
                    <Routes>
                        <Route path="/details/:id" element={<ItemDetails />} />
                        <Route path="/" element={<div>Home Page</div>} />
                    </Routes>
                </MemoryRouter>
            </Provider>,
        );

        expect(screen.getByText('No details available')).toBeInTheDocument();
    });

    test('navigates back when "Close" button is clicked', () => {
        (useFetchItemDetailsQuery as jest.Mock).mockReturnValue({
            data: { animal: { name: 'Test Animal' } },
            isLoading: false,
        });

        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/details/1']}>
                    <Routes>
                        <Route path="/details/:id" element={<ItemDetails />} />
                        <Route path="/" element={<div>Home Page</div>} />
                    </Routes>
                </MemoryRouter>
            </Provider>,
        );

        fireEvent.click(screen.getByText('Close'));
    });
});
