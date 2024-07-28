import searchReducer, {
    SearchState,
    setSearchItems,
    setError,
    setLoading,
    setTotalPages,
    toogleItemSelected,
    unselectAllItems,
} from './searchSlice';
import { SearchItem } from '../types/SearchResult';

describe('searchSlice', () => {
    const initialState: SearchState = {
        items: [],
        loading: false,
        totalPages: 0,
        error: null,
        selectedItems: {},
    };

    const sampleItems: SearchItem[] = [
        { uid: '1', name: 'Item 1' },
        { uid: '2', name: 'Item 2' },
    ];

    const sampleItem: SearchItem = { uid: '1', name: 'Item 1' };

    test('should handle initial state', () => {
        expect(searchReducer(undefined, { type: 'unknown' })).toEqual(
            initialState,
        );
    });

    test('should handle setSearchItems', () => {
        const actual = searchReducer(initialState, setSearchItems(sampleItems));
        expect(actual.items).toEqual(sampleItems);
    });

    test('should handle setError', () => {
        const error = new Error('Test error');
        const actual = searchReducer(initialState, setError(error));
        expect(actual.error).toEqual(error);
    });

    test('should handle setLoading', () => {
        const actual = searchReducer(initialState, setLoading(true));
        expect(actual.loading).toEqual(true);
    });

    test('should handle setTotalPages', () => {
        const actual = searchReducer(initialState, setTotalPages(5));
        expect(actual.totalPages).toEqual(5);
    });

    test('should handle toogleItemSelected - select item', () => {
        const actual = searchReducer(
            initialState,
            toogleItemSelected(sampleItem),
        );
        expect(actual.selectedItems).toEqual({ '1': sampleItem });
    });

    test('should handle toogleItemSelected - unselect item', () => {
        const stateWithSelectedItem: SearchState = {
            ...initialState,
            selectedItems: { '1': sampleItem },
        };
        const actual = searchReducer(
            stateWithSelectedItem,
            toogleItemSelected(sampleItem),
        );
        expect(actual.selectedItems).toEqual({});
    });

    test('should handle unselectAllItems', () => {
        const stateWithSelectedItems: SearchState = {
            ...initialState,
            selectedItems: { '1': sampleItem, '2': sampleItems[1] },
        };
        const actual = searchReducer(
            stateWithSelectedItems,
            unselectAllItems(),
        );
        expect(actual.selectedItems).toEqual({});
    });
});
