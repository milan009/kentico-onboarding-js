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
      listElements: OrderedMap(),
    };
  }

  _removeElement = id => {
    const changedElements = this.state.listElements.delete(id);

    this.setState({ listElements: changedElements });
  };

  _addNewElement = newElementText => {
    const newElement = {
      text: newElementText,
      id: uuidV4(),
      isEdited: false,
    };

    const changedElements = this.state.listElements.set(newElement.id, newElement);

    this.setState({ listElements: changedElements });
  };

  /** Expects change object argument in format:
   {
   <optional> text:     <changedText>,
   <optional> isEdited: <isEdited flag change>
   } */
  _saveChange = (id, change) => {
    const changedElements = this.state.listElements.update(id, editedElement => (
      {
        ...editedElement,
        ...change,
      }));

    this.setState({ listElements: changedElements });
  };

  render() {
    const existingItems = this.state.listElements.toArray().map((element, index) =>
      (<ListItem
        index={index + 1}
        element={element}
        onRemove={this._removeElement}
        onSave={this._saveChange}
        key={element.id}
      />)
    );

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ol className="list-group">
            {existingItems}
            <AddItem addNewElement={this._addNewElement} />
          </ol>
        </div>
      </div>
    );
  }
}

export { List };
