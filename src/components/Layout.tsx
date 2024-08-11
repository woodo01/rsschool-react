import React from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from './ErrorBoundary';
import store from '../redux/store.ts';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <React.StrictMode>
            <ErrorBoundary>
                <Provider store={store}>
                    <div className="App">{children}</div>
                </Provider>
            </ErrorBoundary>
        </React.StrictMode>
    );
};

export default Layout;
