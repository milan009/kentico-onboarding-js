import React, { PureComponent } from 'react';
import { ItemForm } from './ItemForm';
import { ListItem } from './ListItem';
import { generatePseudoUniqueID } from '../utils/keyGenerator';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import TsComponent from './TsComponent.tsx';

class List extends PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  _addItem = (text) => {
    const newItems = this.state.items.slice();
    newItems.push({
      id: generatePseudoUniqueID(),
      textSaved: text,
      textShown: text,
      isEditing: false,
    });

    this.setState({ items: newItems });
  };

  _startEditing = (index) => {
    const newItems = this.state.items.slice();
    const updatedItem = { ...newItems[index], isEditing: true };
    newItems[index] = updatedItem;

    this.setState({ items: newItems });
  };

  _updateItem = (index, event) => {
    const newItems = this.state.items.slice();
    const updatedItem = { ...newItems[index], textShown: event.target.value };
    newItems[index] = updatedItem;

    this.setState({ items: newItems });
  };

  _cancelEditing = (index) => {
    const newItems = this.state.items.slice();
    const updatedItem = { ...newItems[index], isEditing: false, textShown: newItems[index].textSaved };
    newItems[index] = updatedItem;

    this.setState({ items: newItems });
  };

  _saveItem = (index, text) => {
    const newItems = this.state.items.slice();
    const updatedItem = { ...newItems[index], textShown: text, textSaved: text, isEditing: false };
    newItems[index] = updatedItem;

    this.setState({ items: newItems });
  };

  _deleteItem = (indexToDelete) => {
    const newItems = this.state.items.filter((_, index) => index !== indexToDelete);

    this.setState({ items: newItems });
  };

  _createListItems = () =>
    this.state.items.map((item, index) =>
      <ListGroupItem key={item.id}>
        <ListItem
          data={item}
          index={index}
          onSave={this._saveItem}
          onDelete={this._deleteItem}
          onUpdate={this._updateItem}
          onCancel={this._cancelEditing}
          onEdit={this._startEditing}
        />
      </ListGroupItem>
    );


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
