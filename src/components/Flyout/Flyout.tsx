import React from 'react';
import styles from './Flyout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { unselectAllItems } from '../../redux/searchSlice.ts';
import { RootState } from '../../redux/store.ts';
import { convertToCSV } from '../../utils/csvUtils.ts';

const Flyout: React.FC = () => {
    const dispatch = useDispatch();
    const { selectedItems } = useSelector((state: RootState) => state.search);

    const handleUnselectAll = () => {
        dispatch(unselectAllItems());
    };

    const handleDownload = () => {
        const csvContent = convertToCSV(Object.values(selectedItems));
        const blob = new Blob([csvContent], {
            type: 'text/csv;charset=utf-8;',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute(
            'download',
            `${Object.keys(selectedItems).length}_items.csv`,
        );
        link.click();
    };

    return (
        <div className={styles.Flyout}>
            <p>{Object.keys(selectedItems).length} item(s) selected</p>
            <button onClick={handleUnselectAll}>Unselect all</button>
            <button onClick={handleDownload}>Download</button>
        </div>
    );
};

export default Flyout;
