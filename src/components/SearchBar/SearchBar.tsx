import React, { useEffect } from 'react';
import useSearchQuery from '../../hooks/useSearchQuery.tsx';
import { useDispatch } from 'react-redux';
import {
    setError,
    setLoading,
    setSearchItems,
    setTotalPages,
} from '../../redux/searchSlice.ts';
import { useLazyFetchItemsQuery } from '../../redux/apiSlice.ts';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useSearchQuery('searchTerm');
    const dispatch = useDispatch();
    const [fetchItems, { data, error, isLoading }] = useLazyFetchItemsQuery();

    useEffect(() => {
        handleSearch();
    }, [location.search]);

    useEffect(() => {
        if (data) {
            dispatch(setSearchItems(data.animals));
            dispatch(setTotalPages(data.page.totalPages));
        }
        if (error) {
            dispatch(setError(error as Error));
        }
        dispatch(setLoading(isLoading));
    }, [data, error, isLoading, dispatch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const params = new URLSearchParams(location.search);
        let pageNumber = Number(params.get('page')) - 1 || 0;
        pageNumber = pageNumber < 0 ? 0 : pageNumber;
        fetchItems({ searchTerm, pageNumber: pageNumber });
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleChange} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
