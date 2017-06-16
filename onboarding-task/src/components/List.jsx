import React, { PureComponent } from 'react';
import assignment from './../../../assignment.gif';

import uuidV4 from 'uuid/v4';

import TsComponent from './TsComponent.tsx';

import { AddItem } from './AddItem';
import { ListItem } from './ListItem';

class List extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      currentText: '',
    };
  }

  _removeElement = (id) => {
    const removedElement = this.state.elements.find((element) => element.id === id);
    const removedElementIndex = this.state.elements.indexOf(removedElement);
    const elements = [
      ...this.state.elements.slice(0, removedElementIndex),
      ...this.state.elements.slice(removedElementIndex + 1),
    ];
    this.setState({ elements });
  };

  _addNewElement = (newElementText) => {
    const newElement = { text: newElementText, id: uuidV4(), isEdited: false };
    const elements = [...this.state.elements, newElement];

    this.setState({ elements });
  };

  _toggleEditing = (id) => {
    const elements = [...this.state.elements];
    const editedElement = elements.find((e) => e.id === id);
    editedElement.isEdited = !editedElement.isEdited;

    this.setState({ elements });
  };

  _saveChange = (id, change) => {
    const els = [...this.state.elements];
    const element = els.find((e) => e.id === id);

    element.text = change;
    element.isEdited = false;

    this.setState({ elements: els });
  };

  render() {
    const existingItems = this.state.elements.map((element) => {
      return (<ListItem
        element={element}
        removeElement={this._removeElement}
        saveChange={this._saveChange}
        toggleEdit={this._toggleEditing}
      />);
    });

    return (
      <div className="row">
        {/* TODO: You can delete the assignment part once you do not need it */}
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">Desired functionality is captured on the gif image. </p>
            <p className="lead text-center"><b>Note: </b>Try to make solution easily extensible (e.g. more displayed fields per item).</p>
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <form>
              <ol className="form-group">
                {existingItems}
              </ol>
              <div className="form-group">
                <AddItem addNewElement={this._addNewElement} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
