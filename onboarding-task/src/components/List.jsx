import React, { Component } from 'react';
import { OrderedMap, Map } from 'immutable';

import ListItem from './ListItem.jsx';
import AddForm from './AddForm';
import EditForm from './EditForm';
import { generateId } from './../utils/idGenerator';
import { Item } from '../models/ItemModel.js';

class List extends Component {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      items: OrderedMap(),
      areEditable: Map(),
    };
    this._addItem = this._addItem.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
    this._updateItem = this._updateItem.bind(this);
    this._startEditingItem = this._startEditingItem.bind(this);
    this._stopEditingItem = this._stopEditingItem.bind(this);
  }

  _addItem(text) {
    const id = generateId();
    this.setState({
      items: this.state.items.set(id, Item({ text, id })),
      areEditable: this.state.areEditable.set(id, false),
    });
  }

  _deleteItem(id) {
    this.setState({
      items: this.state.items.delete(id),
      areEditable: this.state.areEditable.delete(id),
    });
  }

  _updateItem(id, text) {
    this.setState({
      items: this.state.items.updateIn([id], item => {
        return item.set('text', text);
      }),
    });
  }

  _startEditingItem(id) {
    this.setState({
      areEditable: this.state.areEditable.set(id, true),
    });
  }

  _stopEditingItem(id) {
    this.setState({
      areEditable: this.state.areEditable.set(id, false),
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
                  {this.state.areEditable.get(item.id) ?
                    <EditForm
                      item={item}
                      index={index}
                      onSave={this._updateItem}
                      onDelete={this._deleteItem}
                      onCancel={this._stopEditingItem}
                    />
                    : <ListItem onListItemClick={this._startEditingItem} item={item} index={index} />
                  }
                </li>)
              }
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
