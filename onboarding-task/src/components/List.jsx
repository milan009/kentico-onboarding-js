import React, { Component, PropTypes } from 'react';
import ListItemEditable from './ListItemEditable.jsx';
import ListItemStatic from './ListItemStatic.jsx';
import AddItem from './AddItem.jsx';

class List extends Component {
  static displayName = 'List';

  constructor() {
    super();
    this.state = { items: [] };
    this._addItem = this._addItem.bind(this);
    this._removeItem = this._removeItem.bind(this);
    this._updateItem = this._updateItem.bind(this);
    this._editItem = this._editItem.bind(this);
  }

  _removeItem(guid) {
    const items = this.state.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].guid === guid) {
        items.splice(i, 1);
      }
    }
    this.setState(items);
  }

  _addItem(item) {
    const items = this.state.items;
    items.push(item);
    this.setState(items);
  }

  _updateItem(item) {
    const items = this.state.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].guid === item.guid) {
        items[i] = item;
      }
    }
    this.setState(items);
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
    this.setState(items);
  }

  render() {
    const items = this.state.items;
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <table className="table table-bordered">
              <tbody>
                {items.map((item, index) => {
                  if (item.editable) {
                    return (
                      <tr>
                        <td>
                          <ListItemEditable item={item} key={item.guid} handleDelete={this._removeItem} handleUpdate={this._updateItem} handleClick={this._editItem} />
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr>
                      <td>
                        <ListItemStatic item={item} key={item.guid} handleClick={this._editItem} index={index} />
                      </td>
                    </tr>
                  );
                })
                }
                <tr>
                  <td>
                    <AddItem addItem={this._addItem} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
