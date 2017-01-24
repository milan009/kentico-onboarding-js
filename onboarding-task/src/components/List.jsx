import React from 'react';
import ListItem from './ListItem.jsx';
import AddItem from './AddItem.jsx';

class List extends React.Component {
  constructor() {
    super();
    this.state = { items: [{ text: 'prva', guid: '1010' }] };
    this.addItem = this.addItem.bind(this);
  }

  addItem(item) {
    const items = this.state.items;
    items.push(item);
    this.setState(items);
  }

  render() {
    const items = this.state.items;
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            {items.map(item => <ListItem item={item} key={item.guid} />)}
            <AddItem addItem={this.addItem} />
          </div>
        </div>
      </div>
    );
  }
}

export default List;
