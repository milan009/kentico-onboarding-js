import React, { Component } from 'react';

import TsComponent from './TsComponent.tsx';
import ListRowEdit from './ListRowEdit.jsx';
import ListRow from './ListRow.jsx';
import CreateItem from './CreateItem.jsx';

function generateUUID() {
  let d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { items: new Map() };

    this._onItemAdd = this._onItemAdd.bind(this);
    this._onItemUpdate = this._onItemUpdate.bind(this);
    this._onItemDelete = this._onItemDelete.bind(this);
    this._onItemCancel = this._onItemCancel.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
  }

  _onItemAdd(text) {
    // move inside ListRow??
    if (!text.match(/\S/)) {
      return false;
    }
    const items = this.state.items;
    const id = generateUUID();
    items.set(id, {
      id,
      text,
      editing: false,
    });
    this.setState({ items });
    return true;
  }

  _onItemDelete(id) {
    const items = this.state.items;
    items.delete(id);
    this.setState({ items });
  }

  _onItemUpdate(id, text) {
    // move inside ListRow??
    if (!text.match(/\S/)) {
      return false;
    }
    const items = this.state.items;
    const item = items.get(id);
    item.text = text;
    item.editing = false;
    items.set(id, item);
    this.setState({ items });
    return true;
  }

  _onItemCancel(id) {
    const items = this.state.items;
    const item = items.get(id);
    item.editing = false;
    items.set(id, item);
    this.setState({ items });
  }

  _onItemClick(id) {
    const listItems = this.state.items;
    const item = listItems.get(id);
    item.editing = true;
    listItems.set(id, item);
    this.setState({ items: listItems });
  }

  _getEditRow(index, item) {
    return (
      <ListRowEdit key={item.id} onItemUpdate={this._onItemUpdate} onItemCancel={this._onItemCancel} onItemDelete={this._onItemDelete} item={item}>
        <span>{index}. </span>
      </ListRowEdit>
    );
  }

  _getRow(index, item) {
    return (
      <ListRow key={item.id} item={item} onItemClick={this._onItemClick}>
        <span>{index}. </span>
      </ListRow>
    );
  }

  render() {
    const listItems = [...this.state.items.values()].map((item, i) => {
      let retVal = null;
      if (item.editing) {
        retVal = this._getEditRow(i + 1, item);
      }
      else {
        retVal = this._getRow(i + 1, item);
      }
      return retVal;
    });

    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <div className="list-group">
              {listItems}
              <div className="list-group-item">
                <CreateItem onItemAdd={this._onItemAdd} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
