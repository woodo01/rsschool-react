// src/components/SearchBar.tsx
import { Component, ChangeEvent } from 'react';

interface Props {
    onSearch: (searchTerm: string) => void;
}

interface State {
    searchTerm: string;
}

class SearchBar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const searchTerm = localStorage.getItem('searchTerm') || '';
        this.state = { searchTerm };
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchTerm: event.target.value });
    }

    handleSearch = () => {
        const searchTerm = this.state.searchTerm.trim();
        localStorage.setItem('searchTerm', searchTerm);
        this.props.onSearch(searchTerm);
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.searchTerm}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default SearchBar;
