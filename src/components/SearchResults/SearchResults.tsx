import React from 'react';
import { SearchItem } from '../../types/SearchResult';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

const SearchResults: React.FC = () => {
    const navigate = useNavigate();
    const { items, loading, totalPages } = useSelector(
        (state: RootState) => state.search,
    );

    const handleItemClick = (item: SearchItem) => {
        const params = new URLSearchParams(location.search);
        navigate(`details/${item.uid}/?${params.toString()}`);
    };

    return (
        <>
            <div className="SearchResults">
                {items.map((item) => (
                    <div key={item.uid} onClick={() => handleItemClick(item)}>
                        <h2>{item.name}</h2>
                    </div>
                ))}
                {items.length === 0 ? 'No items found' : ''}
            </div>
            {!loading && items.length > 0 && (
                <Pagination totalPages={totalPages} />
            )}
        </>
    );
};

export default SearchResults;
