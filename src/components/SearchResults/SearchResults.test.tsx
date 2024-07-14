import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchResults from './SearchResults';
import { SearchItem } from '../../types/SearchResult';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('SearchResults', () => {
    const items: SearchItem[] = [
        { uid: '1', name: 'Item 1' },
        { uid: '2', name: 'Item 2' },
        { uid: '3', name: 'Item 3' },
    ];

    const renderComponent = (items: SearchItem[]) => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<SearchResults items={items} />} />
                </Routes>
            </MemoryRouter>,
        );
    };

    test('renders list of items', () => {
        renderComponent(items);
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    test('navigates to item details page on item click', () => {
        renderComponent(items);
        const item = screen.getByText('Item 1');
        fireEvent.click(item);
        expect(mockNavigate).toHaveBeenCalledWith('details/1/?');
    });

    test('displays a message when no items are found', () => {
        renderComponent([]);
        expect(screen.getByText('No items found')).toBeInTheDocument();
    });
});
