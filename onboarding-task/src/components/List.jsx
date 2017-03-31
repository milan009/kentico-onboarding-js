import React, { PureComponent } from 'react';
import { Map as ImmutableMap, Record, List as ImmutableList } from 'immutable';
import { ItemForm } from './CreateItemForm';
import { ListItem } from './ListItem';
import { generatePseudoUniqueID } from '../utils/keyGenerator';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import TsComponent from './TsComponent.tsx';

class List extends PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      items: ImmutableMap(),
      orderedKeys: ImmutableList(),
    };
  }

  _addItem = (text) => {
    const originalItems = this.state.items;
    const originalOrderedKeys = this.state.orderedKeys;
    const id = generatePseudoUniqueID();

    const newItem = new Record({
      textSaved: text,
      textShown: text,
      isEditing: false,
    });

    const newItems = originalItems.set(id, newItem());
    const newOrderedKeys = originalOrderedKeys.insert(originalOrderedKeys.size, id);

    this.setState({
      items: newItems,
      orderedKeys: newOrderedKeys,
    });
  };

  _startEditing= (key) => {
    const newItems = this.state.items.setIn([key, 'isEditing'], true);

    this.setState({ items: newItems });
  };

  _updateItem = (key, event) => {
    const newItems = this.state.items.setIn([key, 'textShown'], event.target.value);

    this.setState({ items: newItems });
  };

  _cancelEditing = (key) => {
    let newItems = this.state.items;
    newItems = newItems.setIn([key, 'textShown'], newItems.get(key).textSaved);
    newItems = newItems.setIn([key, 'isEditing'], false);

    this.setState({ items: newItems });
  };

  _saveItem = (key, text) => {
    let newItems = this.state.items;
    newItems = newItems.setIn([key, 'textShown'], text);
    newItems = newItems.setIn([key, 'textSaved'], text);
    newItems = newItems.setIn([key, 'isEditing'], false);

    this.setState({ items: newItems });
  };

  _deleteItem = (keyToDelete) => {
    const newItems = this.state.items.delete(keyToDelete);
    const newOrderedKeys = this.state.orderedKeys.filter(x => x !== keyToDelete);

    this.setState({
      items: newItems,
      orderedKeys: newOrderedKeys,
    });
  };

  _createListItems = () => {
    return this.state.orderedKeys.map((key, index) => {
      const item = this.state.items.get(key);
      return (<ListGroupItem key={key}>
        <ListItem
          data={item}
          index={index}
          mapKey={key}
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
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">Desired functionality is captured on the gif image. </p>
            <p className="lead text-center"><b>Note: </b>Try to make solution easily extensible (e.g. more displayed fields per item).</p>
          </div>
        </div>

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
