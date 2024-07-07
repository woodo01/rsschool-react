import {Component} from 'react';
import './App.css';
import ErrorBoundary from "./src/components/ErrorBoundary.tsx";
import SearchBar from "./src/components/SearchBar.tsx";
import Results from "./src/components/Results.tsx";

interface Item {
    id: string;
    name: string;
    description: string;
}

interface Props {
}

interface State {
    items: Item[];
    error: Error | null;
}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            items: [],
            error: null,
        };
    }

    componentDidMount() {
        const searchTerm = localStorage.getItem('searchTerm') || '';
        this.fetchItems(searchTerm);
    }

    fetchItems = (searchTerm: string) => {
        const url = 'https://stapi.co/api/v1/rest/animal/search'; // Replace with your actual API endpoint
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
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json();
            })
            .then(data => this.setState({ items: data.animals }))
            .catch(error => this.setState({ error }));
    }

    render() {
        const { items, error } = this.state;

        return (
            <ErrorBoundary>
                <div className="App">
                    <div style={{ height: '20%', background: '#f0f0f0' }}>
                        <SearchBar onSearch={this.fetchItems} />
                    </div>
                    <div style={{ height: '80%', overflowY: 'scroll' }}>
                        {error ? (
                            <p>Error fetching items</p>
                        ) : (
                            <Results items={items} />
                        )}
                    </div>
                </div>
            </ErrorBoundary>
        );
    }
}

export default App;
