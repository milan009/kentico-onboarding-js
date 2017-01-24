import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem.jsx';
import AddItem from './AddItem.jsx';

class List extends Component {
  static displayName = 'List';

  constructor() {
    super();
    this.state = { items: [{ text: 'prva', guid: '1010' }] };
    this._addItem = this._addItem.bind(this);
  }

  _addItem(item) {
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
            <AddItem addItem={this._addItem} />
          </div>
        </div>
      </div>
    );
  }
}

export default List;
