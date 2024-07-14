import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults.tsx';

const mockItems = [
  { uid: '1', name: 'Item 1', description: 'Description 1' },
  { uid: '2', name: 'Item 2', description: 'Description 2' },
  { uid: '3', name: 'Item 3', description: 'Description 2' },
];

test('renders the specified number of cards', () => {
  render(<SearchResults items={mockItems} />);
  expect(screen.getAllByRole('heading')).toHaveLength(3);
});

test('displays an appropriate message if no cards are present', () => {
  render(<SearchResults items={[]} />);
  expect(screen.getByText('No items found')).toBeInTheDocument();
});
