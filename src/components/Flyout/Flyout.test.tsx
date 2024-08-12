import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import Flyout from './Flyout';
import { unselectAllItems } from '../../redux/searchSlice';
import { convertToCSV } from '../../utils/csvUtils';

jest.mock('../../redux/searchSlice', () => ({
    ...jest.requireActual('../../redux/searchSlice'),
    unselectAllItems: jest.fn(),
}));

jest.mock('../../utils/csvUtils', () => ({
    convertToCSV: jest.fn(
        () => 'Name,Description\nTest Item,Description of Test Item',
    ),
}));

const mockStore = configureStore([]);

describe('Flyout Component', () => {
    let store: MockStore;

    beforeEach(() => {
        store = mockStore({
            search: {
                selectedItems: {
                    '1': {
                        uid: '1',
                        name: 'Test Item',
                        description: 'Description of Test Item',
                    },
                },
            },
        });
        store.dispatch = jest.fn();
        global.URL.createObjectURL = jest.fn(() => 'blob:url');
    });

    test('renders correctly with the number of selected items', () => {
        render(
            <Provider store={store}>
                <Flyout />
            </Provider>,
        );

        expect(screen.getByText('1 item(s) selected')).toBeInTheDocument();
    });

    test('calls unselectAllItems when "Unselect all" button is clicked', () => {
        render(
            <Provider store={store}>
                <Flyout />
            </Provider>,
        );

        fireEvent.click(screen.getByText('Unselect all'));
        expect(store.dispatch).toHaveBeenCalledWith(unselectAllItems());
    });

    test('triggers download when "Download" button is clicked', () => {
        render(
            <Provider store={store}>
                <Flyout />
            </Provider>,
        );

        const createObjectURLSpy = jest
            .spyOn(URL, 'createObjectURL')
            .mockReturnValue('blob:url');
        const clickMock = jest.fn();

        const link = {
            setAttribute: jest.fn(),
            click: clickMock,
        };

        jest.spyOn(document, 'createElement').mockReturnValue(
            link as unknown as HTMLAnchorElement,
        );

        fireEvent.click(screen.getByText('Download'));

        expect(convertToCSV).toHaveBeenCalledWith([
            {
                uid: '1',
                name: 'Test Item',
                description: 'Description of Test Item',
            },
        ]);
        expect(link.setAttribute).toHaveBeenCalledWith('href', 'blob:url');
        expect(link.setAttribute).toHaveBeenCalledWith(
            'download',
            '1_items.csv',
        );
        expect(clickMock).toHaveBeenCalled();

        createObjectURLSpy.mockRestore();
    });
});
