import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

describe('Pagination', () => {
    const totalPages = 5;

    const renderComponent = (initialPath = '/') => {
        mockRouter.push(initialPath);
        render(<Pagination totalPages={totalPages} />);
    };

    test('renders correct number of pagination buttons', () => {
        renderComponent();
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(totalPages);
    });

    test('disables button for current page', () => {
        renderComponent('/?page=3');
        const buttons = screen.getAllByRole('button');
        expect(buttons[2]).toBeDisabled();
    });

    test('calls navigate with correct URL on page change', () => {
        renderComponent();
        const buttons = screen.getAllByRole('button');

        fireEvent.click(buttons[2]);
        expect(mockRouter).toMatchObject({
            asPath: '/?page=3',
        });
    });

    test('updates URL correctly when changing page', () => {
        renderComponent('/?page=1');
        const buttons = screen.getAllByRole('button');

        fireEvent.click(buttons[3]);
        expect(mockRouter).toMatchObject({
            asPath: '/?page=4',
        });
    });
});
