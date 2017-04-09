import React, { PureComponent } from 'react';
import { Map as ImmutableMap, List as ImmutableList } from 'immutable';
import { ItemForm } from './CreateItemForm';
import { ListItem } from './ListItem';
import { Item } from '../models/Item';
import { generatePseudoUniqueID } from '../utils/keyGenerator';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class List extends PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      items: ImmutableMap(),
      orderedIds: ImmutableList(),
    };
  }

  _addItem = (text) => {
    const originalItems = this.state.items;
    const originalOrderedKeys = this.state.orderedIds;
    const itemId = generatePseudoUniqueID();

    const newItem = new Item({
      id: itemId,
      textSaved: text,
      textShown: text,
      isEditing: false,
    });

    const updatedItems = originalItems.set(itemId, newItem);
    const updatedOrderedKeys = originalOrderedKeys.push(itemId);

    this.setState({
      items: updatedItems,
      orderedIds: updatedOrderedKeys,
    });
  };

  _startEditing = (id) => {
    const updatedItems = this.state.items.setIn([id, 'isEditing'], true);

    this.setState({ items: updatedItems });
  };

  _updateItem = (id, event) => {
    const updatedItems = this.state.items.setIn([id, 'textShown'], event.target.value);

    this.setState({ items: updatedItems });
  };

  _cancelEditing = (id) => {
    const originalItems = this.state.items;
    const originalItem = originalItems.get(id);
    const updatedItem = originalItem.merge({
      textShown: originalItem.textSaved,
      isEditing: false,
    });
    const updatedItems = originalItems.set(id, updatedItem);

    this.setState({ items: updatedItems });
  };

  _saveItem = (id, text) => {
    const originalItems = this.state.items;
    const originalItem = originalItems.get(id);
    const updatedItem = originalItem.merge({
      textShown: text,
      textSaved: text,
      isEditing: false,
    });
    const updatedItems = originalItems.set(id, updatedItem);

    this.setState({ items: updatedItems });
  };

  _deleteItem = (idToDelete) => {
    const updatedItems = this.state.items.delete(idToDelete);
    const updatedOrderedKeys = this.state.orderedIds.filter(x => x !== idToDelete);

    this.setState({
      items: updatedItems,
      orderedIds: updatedOrderedKeys,
    });
  };

  _createListItems = () => {
    return this.state.orderedIds.map((id, index) => {
      const item = this.state.items.get(id);

      return (
        <ListGroupItem key={id}>
          <ListItem
            data={item}
            index={index}
            id={id}
            onSave={this._saveItem}
            onDelete={this._deleteItem}
            onUpdate={this._updateItem}
            onCancel={this._cancelEditing}
            onEdit={this._startEditing}
          />
        </ListGroupItem>
      );
    });
  };

  render() {
    const listItems = this._createListItems();

    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <ListGroup>
              {listItems}
              <ListGroupItem>
                <ItemForm
                  onAdd={this._addItem}
                />
              </ListGroupItem>
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

export { List };
