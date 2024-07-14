import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders correctly', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('updates search term and localStorage on search', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('test search');
  });

  test('calls onSearch with loading state and fetches data', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        animals: [
          { name: 'Animal 1', description: 'Description 1' },
          { name: 'Animal 2', description: 'Description 2' },
        ],
      }),
    );

    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith({
      items: [],
      error: null,
      loading: true,
    });

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        'https://stapi.co/api/v1/rest/animal/search',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'name=test+search',
        }),
      ),
    );

    await waitFor(() =>
      expect(mockOnSearch).toHaveBeenCalledWith({
        items: [
          { name: 'Animal 1', description: 'Description 1' },
          { name: 'Animal 2', description: 'Description 2' },
        ],
        error: null,
        loading: false,
      }),
    );
  });

  test('handles fetch errors correctly', async () => {
    fetchMock.mockReject(new Error('Network response was not ok'));

    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith({
      items: [],
      error: null,
      loading: true,
    });

    await waitFor(() =>
      expect(mockOnSearch).toHaveBeenCalledWith({
        items: [],
        error: new Error('Network response was not ok'),
        loading: false,
      }),
    );
  });
});
