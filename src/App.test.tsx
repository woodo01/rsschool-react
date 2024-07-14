import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('App', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders correctly', () => {
    render(<App />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('search functionality works correctly', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        animals: [
          { name: 'Animal 1', description: 'Description 1' },
          { name: 'Animal 2', description: 'Description 2' },
        ],
      }),
    );

    render(<App />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(button);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

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

    await waitFor(() => {
      expect(screen.getByText('Animal 1')).toBeInTheDocument();
      expect(screen.getByText('Animal 2')).toBeInTheDocument();
    });
  });

  test('displays error when search fails', async () => {
    fetchMock.mockReject(new Error('Network response was not ok'));

    render(<App />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(button);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Error fetching items')).toBeInTheDocument();
    });
  });

  test('throws error when error button is clicked', () => {
    render(<App />);
    const button = screen.getByText('Throw Error');

    expect(() => {
      fireEvent.click(button);
    }).toThrow(Error);
  });
});
