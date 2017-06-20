import React, { PureComponent } from 'react';
import uuidV4 from 'uuid/v4';

import { AddItem } from './AddItem';
import { ListItem } from './ListItem';

class List extends PureComponent {

  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      elements: [],
    };
  }

  _removeElement = (id) => {
    const newElements = this.state.elements.filter((element => element.id !== id));
    this.setState({ elements: newElements });
  };

  _addNewElement = (newElementText) => {
    const newElement = {
      text: newElementText,
      id: uuidV4(),
      isEdited: false,
    };

    const elements = [...this.state.elements, newElement];

    this.setState({ elements });
  };

  _toggleEditing = (id) => {
    const editedElements = this.state.elements.map((element) => {
      if (element.id !== id) {
        return element;
      }

      return {
        ...element,
        isEdited: !element.isEdited,
      };
    });

    this.setState({ elements: editedElements });
  };

  _saveChange = (id, change) => {
    const editedElements = this.state.elements.map((element) => {
      if (element.id !== id) {
        return element;
      }

      return {
        ...element,
        text: change,
        isEdited: false,
      };
    });

    this.setState({ elements: editedElements });
  };

  render() {
    const existingItems = this.state.elements.map((element, index) => {
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
