// src/components/Results.tsx
import { Component } from 'react';

interface Item {
  uid: string;
  name: string;
}

interface Props {
  items: Item[];
}

class Results extends Component<Props> {
  render() {
    const { items } = this.props;
    return (
      <div>
        {items.map((item) => (
          <div key={item.uid}>
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
