import React, { useEffect } from 'react';
import { Props } from '../../types/SearchBar.ts';
import { useSearchQuery } from '../../hooks/useSearchQuery.tsx';

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useSearchQuery('searchTerm');

  useEffect(() => {
    fetchItems(searchTerm);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    fetchItems(trimmedSearchTerm);
  };

  const fetchItems = (searchTerm: string) => {
    onSearch({ items: [], error: null, loading: true });
    const url = 'https://stapi.co/api/v1/rest/animal/search';
    const body = new URLSearchParams();
    if (searchTerm) {
      body.append('name', searchTerm);
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then((data) =>
        onSearch({
          items: data.animals,
          error: null,
          loading: false,
        }),
      )
      .catch((error) => onSearch({ items: [], error, loading: false }));
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
