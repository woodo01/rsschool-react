import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from './redux/searchSlice.ts';
import { RootState } from './redux/store.ts';
import ThemeSelector from './components/ThemeSelector/ThemeSelector.tsx';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import Loader from './components/Loader/Loader.tsx';
import SearchResults from './components/SearchResults/SearchResults.tsx';
import { useRouter } from 'next/router';

const App: React.FC = () => {
    const router = useRouter();
    const { id, ...otherQueryParams } = router.query;
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.search);
    const { theme } = useSelector((state: RootState) => state.theme);

    const handleMainPanelClick = () => {
        console.log(id);
        if (location.pathname.startsWith('/details')) {
            router.push({
                pathname: `/`,
                query: { ...otherQueryParams },
            });
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
            </div>
        </section>
    );
};

export default App;
