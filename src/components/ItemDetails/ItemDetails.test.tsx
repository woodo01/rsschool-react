import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import ItemDetails from './ItemDetails';

fetchMock.enableMocks();

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('ItemDetails', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    const renderComponent = (id: string) => {
        render(
            <MemoryRouter initialEntries={[`/details/${id}`]}>
                <Routes>
                    <Route path="/details/:id" element={<ItemDetails />} />
                </Routes>
            </MemoryRouter>,
        );
    };

    test('renders loader initially', () => {
        renderComponent('test-id');
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('fetches and displays item details', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                animal: { id: 'test-id', name: 'Test Animal' },
            }),
        );

        renderComponent('test-id');

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
        await waitFor(() =>
            expect(screen.getByText('Test Animal')).toBeInTheDocument(),
        );
    });

    test('handles fetch error', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}));

        renderComponent('test-id');

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
        await waitFor(() =>
            expect(
                screen.getByText('No details available'),
            ).toBeInTheDocument(),
        );
    });

    test('close button updates URL', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                animal: { id: 'test-id', name: 'Test Animal' },
            }),
        );

        renderComponent('test-id');

        await waitFor(() =>
            expect(screen.getByText('Test Animal')).toBeInTheDocument(),
        );

        const closeButton = screen.getByText('Close');
        fireEvent.click(closeButton);

        expect(mockNavigate).toHaveBeenCalledWith('/?');
    });
});
