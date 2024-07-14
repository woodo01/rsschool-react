import React, { useState } from 'react';
import './App.css';
import { SearchItem } from './types/SearchResult.ts';
import Loader from './components/Loader/Loader.tsx';
import SearchResults from './components/SearchResults/SearchResults.tsx';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import { State } from './types/App.ts';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Pagination from './components/Pagination/Pagination.tsx';

const App: React.FC = () => {
    const [items, setItems] = useState<SearchItem[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const currentPage = Number(params.get('page')) - 1 || 0;
    const onSearch = (state: State) => {
        setItems(state.items);
        setTotalPages(state.totalPages);
        setError(state.error);
        setLoading(state.loading);
    };

    const handleMainPanelClick = () => {
        const params = new URLSearchParams(location.search);
        if (location.pathname.startsWith('/details')) {
            navigate(`/?${params.toString()}`);
        }
    };

    if (error) {
        throw error;
    }

    return (
        <section className="App">
            <div className="SearchBar">
                <SearchBar onSearch={onSearch} pageNumber={currentPage} />
                <button
                    onClick={() => {
                        setError(new Error());
                    }}
                >
                    Throw Error
                </button>
            </div>
            <div className="Content" onClick={handleMainPanelClick}>
                <div className="SearchResult">
                    {error ? (
                        <p>Error fetching items</p>
                    ) : loading ? (
                        <Loader />
                    ) : (
                        <SearchResults items={items} />
                    )}
                </div>
                <Outlet />
            </div>
            {!loading && items.length > 0 && (
                <Pagination totalPages={totalPages} />
            )}
        </section>
    );
};

export default App;
