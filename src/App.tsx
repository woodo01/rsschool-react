import { Component } from 'react';
import './App.css';
import SearchBar from './src/components/SearchBar.tsx';
import Results from './src/components/Results.tsx';
import Loader from './src/components/Loader/Loader.tsx';

interface Item {
  uid: string;
  name: string;
}

interface Props {}

interface State {
  items: Item[];
  error: Error | null;
  loading: boolean;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      items: [],
      error: null,
      loading: false,
    };
  }

  componentDidMount() {
    const searchTerm = localStorage.getItem('searchTerm') || '';
    this.fetchItems(searchTerm);
  }

  fetchItems = (searchTerm: string) => {
    this.setState({ loading: true });
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
      .then((data) => this.setState({ items: data.animals }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { items, error, loading } = this.state;

    if (error) {
      throw error;
    }

    return (
      <div className="App">
        <div style={{ height: '20%', background: '#f0f0f0' }}>
          <SearchBar onSearch={this.fetchItems} />
          <button
            onClick={() => {
              this.setState({ error: new Error() });
            }}
          >
            Throw Error
          </button>
        </div>
        <div style={{ height: '80%', overflowY: 'scroll' }}>
          {error ? (
            <p>Error fetching items</p>
          ) : loading ? (
            <Loader />
          ) : (
            <Results items={items} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
