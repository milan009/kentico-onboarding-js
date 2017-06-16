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
    const els = [...this.state.elements];
    const elId = els.indexOf(this.state.elements.find((el) => el.id === id));
    els.splice(elId, 1);

    this.setState({ elements: els });
  };

  _addNewElement = (elementText) => {
    const els = [...this.state.elements];
    els.push({ text: elementText, id: uuidV4(), isEdited: false });

    this.setState({ elements: els });
  };

  _toggleEditing = (id) => {
    const els = [...this.state.elements];
    const element = els.find((e) => e.id === id);
    element.isEdited = !element.isEdited;

    this.setState({ elements: els });
  };

  _saveChange = (id, change) => {
    const els = [...this.state.elements];
    const element = els.find((e) => e.id === id);

    element.text = change;
    element.isEdited = false;

    this.setState({ elements: els });
  };

  render() {
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
            <ol>
              {this.state.elements.map((el) => {
                return (<ListItem
                  text={el.text}
                  uid={el.id}
                  isEdited={el.isEdited}
                  removeElement={this._removeElement}
                  saveChange={this._saveChange}
                  toggleEdit={this._toggleEditing}
                />);
              })}
            </ol>
            <AddItem addNewElement={this._addNewElement} />
          </div>
        </div>
      </div>
    );
  }
}

export default List;
