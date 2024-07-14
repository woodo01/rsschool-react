import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Pagination from './Pagination';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: () => ({
        search: '',
    }),
}));

describe('Pagination', () => {
    const totalPages = 5;

    const renderComponent = (initialEntries = ['/']) => {
        render(
            <MemoryRouter initialEntries={initialEntries}>
                <Routes>
                    <Route
                        path="/"
                        element={<Pagination totalPages={totalPages} />}
                    />
                </Routes>
            </MemoryRouter>,
        );
    };

    test('renders correct number of pagination buttons', () => {
        renderComponent();
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(totalPages);
    });

    test('disables button for current page', () => {
        renderComponent(['/?page=3']);
        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toBeDisabled();
    });

    test('calls navigate with correct URL on page change', () => {
        renderComponent();
        const buttons = screen.getAllByRole('button');

        fireEvent.click(buttons[2]);
        expect(mockNavigate).toHaveBeenCalledWith('/?page=3');
    });

    test('updates URL correctly when changing page', () => {
        renderComponent(['/?page=1']);
        const buttons = screen.getAllByRole('button');

        fireEvent.click(buttons[3]);
        expect(mockNavigate).toHaveBeenCalledWith('/?page=4');
    });
});
