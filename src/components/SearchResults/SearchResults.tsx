import React from 'react';
import { SearchItem } from '../../types/SearchResult';
import Pagination from '../Pagination/Pagination.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import { toggleItemSelected } from '../../redux/searchSlice.ts';
import Flyout from '../Flyout/Flyout.tsx';
import { useRouter } from 'next/router';

const SearchResults: React.FC = () => {
    const dispatch = useDispatch();
    const { items, loading, totalPages, selectedItems } = useSelector(
        (state: RootState) => state.search,
    );
    const router = useRouter();

    const handleItemClick = (item: SearchItem) => {
        router.push({
            pathname: `/details/${item.uid}`,
            query: { ...router.query },
        });
    };

    const handleCheckboxChange = (item: SearchItem) => {
        dispatch(toggleItemSelected(item));
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
