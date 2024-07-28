import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setTheme } from '../../redux/themeSlice';
// import './ThemeSelector.css'; // Add appropriate styles for the theme selector

const ThemeSelector: React.FC = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state: RootState) => state.theme);

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setTheme(event.target.value));
    };

    return (
        <div className="ThemeSelector">
            <label htmlFor="theme-select">Select Theme:</label>
            <select
                id="theme-select"
                value={theme}
                onChange={handleThemeChange}
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </div>
    );
};

export default ThemeSelector;
