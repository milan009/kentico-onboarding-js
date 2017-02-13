import React, { Component } from 'react';

import ListItem from './ListItem.jsx';
import AddForm from './AddForm';
import generateID from './../utils/idGenerator';

class List extends Component {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this._addItem = this._addItem.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
    this._updateItem = this._updateItem.bind(this);
  }

  _addItem(text) {
    const newItem = {
      id: generateID(),
      text,
    };
    this.setState({
      items: [...this.state.items, newItem],
    });
  }

  _deleteItem(id) {
    const remainingItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: remainingItems,
    });
  }

  _updateItem(id, text) {
    const updatedItems = this.state.items.map((item => {
      if (item.id === id) {
        const updatedItem = { ...item, text };
        return updatedItem;
      }
      return item;
    }));
    this.setState({
      items: updatedItems,
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <pre>
            <ul className="list-group">
              {this.state.items.map((item, index) =>
                <ListItem
                  item={item}
                  index={index}
                  onDelete={this._deleteItem}
                  onSave={this._updateItem}
                  key={item.id}
                />
              )}
              <li className="list-group-item">
                <AddForm onAdd={this._addItem} />
              </li>
            </ul>
          </pre>
        </div>
      </div>
    );
  }
}

export default List;
