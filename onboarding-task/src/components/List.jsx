import React, { Component, PropTypes } from 'react';
import ListItemEditable from './ListItemEditable.jsx';
import ListItemStatic from './ListItemStatic.jsx';
import AddItem from './AddItem.jsx';

class List extends Component {
  static displayName = 'List';

  constructor() {
    super();
    this.state = { items: [{ guid: 22, text: 'serus', editable: false }, { guid: 24, text: 'nazdar', editable: true }] };
    this._addItem = this._addItem.bind(this);
    this._removeItem = this._removeItem.bind(this);
    this._updateItem = this._updateItem.bind(this);
    this._editItem = this._editItem.bind(this);
    this._getItemToRender = this._getItemToRender.bind(this);
  }

  _removeItem(guid) {
    const items = this.state.items.filter(item => item.guid !== guid);
    this.setState({ items });
  }

  _addItem(item) {
    const items = this.state.items;
    items.push(item);
    this.setState({ items });
  }

  _updateItem(item) {
    const items = this.state.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].guid === item.guid) {
        items[i] = item;
      }
    }
    this.setState({ items });
  }

  _editItem(item) {
    const items = this.state.items;
    const editedItem = item;
    editedItem.editable = !item.editable;
    for (let i = 0; i < items.length; i++) {
      if (items[i].guid === editedItem.guid) {
        items[i] = editedItem;
      }
    }
    this.setState({ items });
  }

  _getItemToRender(item, index) {
    return (item.editable)
      ? (<ListItemEditable key={item.guid} item={item} handleDelete={this._removeItem} handleUpdate={this._updateItem} handleClick={this._editItem} />)
      : (<ListItemStatic key={item.guid} item={item} handleClick={this._editItem} index={index} />);
  }

  render() {
    const items = this.state.items;
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <table className="table table-bordered">
            <tbody>
              {items.map(this._getItemToRender)}
              <AddItem addItem={this._addItem} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default List;
