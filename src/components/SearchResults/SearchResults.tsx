import React from 'react';
import { SearchItem } from '../../types/SearchResult';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import { toogleItemSelected } from '../../redux/searchSlice.ts';
import Flyout from '../Flyout/Flyout.tsx';

const SearchResults: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items, loading, totalPages, selectedItems } = useSelector(
        (state: RootState) => state.search,
    );

    const handleItemClick = (item: SearchItem) => {
        const params = new URLSearchParams(location.search);
        navigate(`details/${item.uid}/?${params.toString()}`);
    };

    const handleCheckboxChange = (item: SearchItem) => {
        dispatch(toogleItemSelected(item));
    };

    const selectedItemsCount = Object.keys(selectedItems).length;

    return (
        <>
            {selectedItemsCount > 0 && <Flyout />}
            <div className="SearchResults">
                {items.map((item) => (
                    <div key={item.uid}>
                        <input
                            type="checkbox"
                            checked={item.uid in selectedItems}
                            onChange={() => handleCheckboxChange(item)}
                        />
                        <span
                            key={item.uid}
                            onClick={() => handleItemClick(item)}
                        >
                            {item.name}
                        </span>
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
