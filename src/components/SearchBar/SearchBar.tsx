import React, { useEffect } from 'react';
import { Props } from '../../types/SearchBar.ts';
import useSearchQuery from '../../hooks/useSearchQuery.tsx';
import { useLocation } from 'react-router-dom';

const SearchBar: React.FC<Props> = ({ onSearch, pageNumber }) => {
    const [searchTerm, setSearchTerm] = useSearchQuery('searchTerm');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        pageNumber = Number(params.get('page')) - 1 || 0;
        pageNumber = pageNumber < 0 ? 0 : pageNumber;
        fetchItems(searchTerm);
        fetchItems(searchTerm);
    }, [location.search]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const trimmedSearchTerm = searchTerm.trim();
        fetchItems(trimmedSearchTerm);
    };

    const fetchItems = (searchTerm: string) => {
        onSearch({ items: [], totalPages: 0, error: null, loading: true });
        const url =
            'https://stapi.co/api/v1/rest/animal/search?pageNumber=' +
            pageNumber;
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
                    totalPages: data.page.totalPages,
                    error: null,
                    loading: false,
                }),
            )
            .catch((error) =>
                onSearch({ items: [], totalPages: 0, error, loading: false }),
            );
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleChange} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
