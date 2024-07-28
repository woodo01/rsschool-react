import React from 'react';
import './App.css';
import Loader from './components/Loader/Loader.tsx';
import SearchResults from './components/SearchResults/SearchResults.tsx';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from './redux/searchSlice.ts';
import { RootState } from './redux/store.ts';
import ThemeSelector from './components/ThemeSelector/ThemeSelector.tsx';

const App: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.search);
    const { theme } = useSelector((state: RootState) => state.theme);

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
        <section className={`App ${theme}`}>
            <div className="ThemeSelectorContainer">
                <ThemeSelector />
            </div>
            <div className="SearchBar">
                <SearchBar />
                <button
                    onClick={() => {
                        dispatch(setError(new Error()));
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
                        <SearchResults />
                    )}
                </div>
                <Outlet />
            </div>
        </section>
    );
};

export default App;
