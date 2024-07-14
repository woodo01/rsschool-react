import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import NotFound from './components/NotFound.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemDetails from './components/ItemDetails/ItemDetails.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route
                                path="details/:id"
                                element={<ItemDetails />}
                            />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </ErrorBoundary>
    </React.StrictMode>,
);
