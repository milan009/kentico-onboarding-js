import React, { Component } from 'react';
import ListItemEditable from './ListItemEditable.jsx';
import ListItemStatic from './ListItemStatic.jsx';
import Immutable from 'immutable';
import NewItem from './NewItem.jsx';
import { generateGuid } from '../utils/utils.js';


class List extends Component {
  static displayName = 'List';

  constructor() {
    super();

    this.getInitialState();


    this._addItem = this._addItem.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
    this._saveItem = this._saveItem.bind(this);
    this._toggleEditMode = this._toggleEditMode.bind(this);
    this._getItemToRender = this._getItemToRender.bind(this);
  }

  getInitialState() {
    const firstItem = Immutable.Map({ guid: generateGuid(), text: 'serus', editable: false });
    const secondItem = Immutable.Map({ guid: generateGuid(), text: 'soj', editable: false });
    const thirdItem = Immutable.Map({ guid: generateGuid(), text: 'nazdar', editable: false });

    this.state = {
      items: Immutable.Map({
        [firstItem.get('guid')]: firstItem,
        [secondItem.get('guid')]: secondItem,
        [thirdItem.get('guid')]: thirdItem,
      }),
    };
  }

  _deleteItem(guid) {
    const items = this.state.items.delete(guid);
    this.setState({ items });
  }

  _addItem(newText) {
    const newItem = Immutable.Map({
      guid: generateGuid(),
      text: newText,
      editable: false,
    });

    const items = this.state.items.set(newItem.get('guid'), newItem);
    this.setState({ items });
  }

  _saveItem(guid, text) {
    const items = this.state.items.updateIn([guid, 'text'], val => text).updateIn([guid, 'editable'], val => false);
    this.setState({ items });
  }

  _toggleEditMode(guid) {
    const items = this.state.items.updateIn([guid, 'editable'], val => !val);
    this.setState({ items });
  }

  _getItemToRender(item) {
    return (item.get('editable'))
      ? (<ListItemEditable key={item.guid} item={item} onDelete={this._deleteItem} onSave={this._saveItem} onCancel={this._toggleEditMode} />)
      : (<ListItemStatic key={item.guid} item={item} onClick={this._toggleEditMode} />);
  }

  render() {
    const items = this.state.items;
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <table className="table table-bordered">
            <tbody>
              {items.map(this._getItemToRender)}
              <NewItem addItem={this._addItem} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default List;
