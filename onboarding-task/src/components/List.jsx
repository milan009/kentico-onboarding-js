import React, { PureComponent } from 'react';

import uuidV4 from 'uuid/v4';
import { OrderedMap } from 'immutable';

import { AddItem } from './AddItem';
import { ListItem } from './ListItem';

class List extends PureComponent {

  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      elements: OrderedMap(),
    };
  }

  _removeElement = (id) => {
    const changedElements = this.state.elements.delete(id);

    this.setState({ elements: changedElements });
  };

  _addNewElement = (newElementText) => {
    const newElement = {
      text: newElementText,
      id: uuidV4(),
      isEdited: false,
    };

    const changedElements = this.state.elements.set(newElement.id, newElement);

    this.setState({ elements: changedElements });
  };

  _toggleEditing = (id) => {
    const changedElements = this.state.elements.update(id, editedElement => (
      {
        ...editedElement,
        isEdited: !editedElement.isEdited,
      }));

    this.setState({ elements: changedElements });
  };

  _saveChange = (id, change) => {
    const changedElements = this.state.elements.update(id, editedElement => (
      {
        ...editedElement,
        isEdited: false,
        text: change,
      }));

    this.setState({ elements: changedElements });
  };

  render() {
    const existingItems = this.state.elements.toArray().map((element, index) => {
      return (<ListItem
        index={index + 1}
        element={element}
        removeElement={this._removeElement}
        saveChange={this._saveChange}
        toggleEdit={this._toggleEditing}
        key={element.id}
      />);
    });

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <div className="list-group">
            <ol>
              {existingItems}
              <AddItem addNewElement={this._addNewElement} />
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
