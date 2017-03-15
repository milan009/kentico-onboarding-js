import React, { Component } from 'react';

import TsComponent from './TsComponent.tsx';
import { CreateItem } from './CreateItem.jsx';
import { ListRow } from './ListRow.jsx';

import { generateUuid } from '../utils/idGenerator.js';

class List extends Component {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = { items: new Map() };
  }

  _onItemAdd = (text) => {
    const id = generateUuid();
    const items = this.state.items;
    const item = {
      id,
      text,
      editing: false,
    };
    items.set(id, item);

    this.setState({ items });
  };

  _onItemDelete = (id) => {
    const items = this.state.items;
    items.delete(id);
    this.setState({ items });
  };

  _onItemUpdate = (id, text) => {
    this._updateItemFromState(id, {
      text,
      editing: false,
    });
  };

  _onItemCancel = (id) => {
    this._updateItemFromState(id, { editing: false });
  };

  _onItemClick = (id) => {
    this._updateItemFromState(id, { editing: true });
  };

  _updateItemFromState = (id, values) => {
    const items = this.state.items;
    const item = items.get(id) || {};
    const newItem = {
      ...item,
      ...values,
    };
    items.set(id, newItem);

    this.setState({ items });
  };

  render() {
    const listItems = [...this.state.items.values()].map((item, i) =>
      <div key={item.id} className="list-group-item item-custom">
        <ListRow
          index={i + 1}
          item={item}
          onItemClick={this._onItemClick}
          onItemUpdate={this._onItemUpdate}
          onItemDelete={this._onItemDelete}
          onItemCancel={this._onItemCancel}
        />
      </div>
    );

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

export { List };
