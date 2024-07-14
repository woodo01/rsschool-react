import { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar.tsx';
import Results from './components/Results.tsx';
import Loader from './components/Loader/Loader.tsx';
import { State } from './types/App.ts';

class App extends Component<never, State> {
  constructor(props: never) {
    super(props);
    this.state = {
      items: [],
      error: null,
      loading: false,
    };
  }

  onSearch = (state: State) => {
    this.setState(state);
  };

  render() {
    const { items, error, loading } = this.state;

    if (error) {
      throw error;
    }

    return (
      <section className="App">
        <div className="SearchBar">
          <SearchBar onSearch={this.onSearch} />
          <button
            onClick={() => {
              this.setState({ error: new Error() });
            }}
          >
            Throw Error
          </button>
        </div>
        <div className="SearchResult">
          {error ? (
            <p>Error fetching items</p>
          ) : loading ? (
            <Loader />
          ) : (
            <Results items={items} />
          )}
        </div>
      </section>
    );
  }
}

export default App;
