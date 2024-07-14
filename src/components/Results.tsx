import { Component } from 'react';
import { Props } from '../types/SearchResult.ts';

class Results extends Component<Props> {
  render() {
    const { items } = this.props;
    return (
      <section>
        {items.map((item) => (
          <div key={item.uid}>
            <h3>{item.name}</h3>
          </div>
        ))}
      </section>
    );
  }
}

export default Results;
