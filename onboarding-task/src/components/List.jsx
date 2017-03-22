import React, { PureComponent } from 'react';

import TsComponent from './TsComponent.tsx';
import { CreateItem } from './CreateItem.jsx';
import { ListRow } from './ListRow.jsx';
import { Map } from 'immutable';

import { generateUuid } from '../utils/idGenerator.js';
import { Item } from '../models/Item';

class List extends PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = { items: new Map() };
  }

  _onItemAdd = (text) => {
    const id = generateUuid();
    const item = new Item({
      id,
      text,
      editing: false,
    });
    const items = this.state.items.set(id, item);

    this.setState({ items });
  };

  _onItemDelete = (id) => {
    const items = this.state.items.delete(id);

    this.setState({ items });
  };

  _onItemUpdate = (id, text) => {
    const items = this.state.items.mergeIn([id], {
      text,
      editing: false,
    });

    this.setState({ items });
  };

  _onItemCancel = (id) => {
    const items = this.state.items.setIn([id, 'editing'], false);

    this.setState({ items });
  };

  _onItemClick = (id) => {
    const items = this.state.items.setIn([id, 'editing'], true);

    this.setState({ items });
  };

  render() {
    const listItems = this.state.items.valueSeq().map((item, i) => {
      return (
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

export { List };
