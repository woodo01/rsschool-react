import React from 'react';
import { SearchItem } from '../../types/SearchResult';
import { useNavigate } from 'react-router-dom';

interface SearchResultsProps {
    items: SearchItem[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ items }) => {
    const navigate = useNavigate();

    const handleItemClick = (item: SearchItem) => {
        const params = new URLSearchParams(location.search);
        navigate(`details/${item.uid}/?${params.toString()}`);
    };

    return (
        <div className="SearchResults">
            {items.map((item) => (
                <div key={item.uid} onClick={() => handleItemClick(item)}>
                    <h2>{item.name}</h2>
                </div>
            ))}
            {items.length === 0 ? 'No items found' : ''}
        </div>
    );
};

export default SearchResults;
