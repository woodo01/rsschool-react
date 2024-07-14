import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import SearchBar from './SearchBar';
import { Props } from '../../types/SearchBar';

fetchMock.enableMocks();

const mockOnSearch = jest.fn();

const renderComponent = (initialEntries = ['/']) => {
    const props: Props = {
        onSearch: mockOnSearch,
        pageNumber: 0,
    };

    render(
        <MemoryRouter initialEntries={initialEntries}>
            <Routes>
                <Route path="/" element={<SearchBar {...props} />} />
            </Routes>
        </MemoryRouter>,
    );
};

describe('SearchBar', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        mockOnSearch.mockClear();
    });

    test('renders search input and button', () => {
        renderComponent();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /search/i }),
        ).toBeInTheDocument();
    });

    test('updates search term on input change', () => {
        renderComponent();
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test search' } });
        expect(input).toHaveValue('test search');
    });

    test('fetches items on component mount based on URL search parameters', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                animals: [{ name: 'Animal 1' }, { name: 'Animal 2' }],
                page: { totalPages: 2 },
            }),
        );

        renderComponent(['/?page=2']);
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2)); // Called twice on mount due to the duplicate fetchItems call
        expect(mockOnSearch).toHaveBeenCalledWith({
            items: [{ name: 'Animal 1' }, { name: 'Animal 2' }],
            totalPages: 2,
            error: null,
            loading: false,
        });
    });

    test('fetches items on search button click', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                animals: [{ name: 'Animal 1' }, { name: 'Animal 2' }],
                page: { totalPages: 2 },
            }),
        );

        renderComponent();
        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button', { name: /search/i });

        fireEvent.change(input, { target: { value: 'test search' } });
        fireEvent.click(button);

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3)); // Called twice on mount and once on search

        expect(fetchMock).toHaveBeenCalledWith(
            'https://stapi.co/api/v1/rest/animal/search?pageNumber=0',
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'name=test+search',
            }),
        );
        expect(mockOnSearch).toHaveBeenCalledWith({
            items: [{ name: 'Animal 1' }, { name: 'Animal 2' }],
            totalPages: 2,
            error: null,
            loading: false,
        });
    });
});
