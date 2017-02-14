import React, { Component } from 'react';
import { OrderedMap } from 'immutable';

import ListItem from './ListItem.jsx';
import AddForm from './AddForm';
import generateID from './../utils/idGenerator';
import { Item } from '../models/ItemModel.js';

class List extends Component {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      items: OrderedMap(),
    };
    this._addItem = this._addItem.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
    this._updateItem = this._updateItem.bind(this);
  }

  _addItem(text) {
    const id = generateID();
    this.setState({
      items: this.state.items.set(id, Item({ text, id })),
    });
  }

  _deleteItem(id) {
    this.setState({
      items: this.state.items.delete(id),
    });
  }

  _updateItem(id, text) {
    this.setState({
      items: this.state.items.updateIn([id], value => {
        return value.set('text', text);
      }),
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <pre>
            <ul className="list-group">
              {this.state.items.valueSeq().map((item, index) =>
                <li className="list-group-item" key={item.id}>
                  <ListItem
                    item={item}
                    index={index}
                    onDelete={this._deleteItem}
                    onSave={this._updateItem}
                  />
                </li>
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
