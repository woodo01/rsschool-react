import React from 'react';
import { Props } from '../types/SearchResult.ts';

const SearchResults: React.FC<Props> = ({ items }) => {
  return (
    <div>
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        items.map((item) => (
          <div key={item.uid}>
            <h3>{item.name}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
