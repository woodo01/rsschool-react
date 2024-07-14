import { Component, ChangeEvent } from 'react';
import { Props, State } from '../types/SearchBar.ts';

class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
    };
  }

  componentDidMount() {
    const searchTerm = localStorage.getItem('searchTerm') || '';
    this.fetchItems(searchTerm);
  }

  fetchItems = (searchTerm: string) => {
    this.props.onSearch({ items: [], error: null, loading: true });
    const url = 'https://stapi.co/api/v1/rest/animal/search';
    const body = new URLSearchParams();
    if (searchTerm) {
      body.append('name', searchTerm);
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then((data) =>
        this.props.onSearch({
          items: data.animals,
          error: null,
          loading: false,
        }),
      )
      .catch((error) =>
        this.props.onSearch({ items: [], error, loading: false }),
      );
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const searchTerm = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', searchTerm);
    this.fetchItems(searchTerm);
  };

  render() {
    return (
      <section>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </section>
    );
  }
}

export default SearchBar;
