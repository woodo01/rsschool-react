import React, { useState } from 'react';
import './App.css';
import { SearchItem } from './types/SearchResult.ts';
import Loader from './components/Loader/Loader.tsx';
import SearchResults from './components/SearchResults/SearchResults.tsx';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import { State } from './types/App.ts';

const App: React.FC = () => {
  const [items, setItems] = useState<SearchItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSearch = (state: State) => {
    setItems(state.items);
    setError(state.error);
    setLoading(state.loading);
  };

  if (error) {
    throw error;
  }

  return (
    <section className="App">
      <div className="SearchBar">
        <SearchBar onSearch={onSearch} />
        <button
          onClick={() => {
            setError(new Error());
          }}
        >
          Throw Error
        </button>
      </div>
      <div className="SearchResult">
        {error ? (
          <p>Error fetching items</p>
        ) : loading ? (
          <Loader />
        ) : (
          <SearchResults items={items} />
        )}
      </div>
    </section>
  );
};

export default App;
