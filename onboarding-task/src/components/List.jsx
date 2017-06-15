import React, { Component } from 'react';
import assignment from './../../../assignment.gif';

import uuidV4 from 'uuid/v4';

import TsComponent from './TsComponent.tsx';
import { ListItemDisplayer } from './ListItemDisplayer';
import { ListItemEditor } from './ListItemEditor';
// import { ListItemEditor } from './ListItemEditor';

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      currentText: '',
    };
  }

  _removeElement(key) {
    const elId = this.state.elements.indexOf(this.state.elements.find((el) => el.key === key));
    const els = this.state.elements;
    els.splice(elId, 1);
    this.setState({ elements: els });
  }

  _addNewElement(elementText) {
    const els = this.state.elements;
    els.push({ text: elementText, key: uuidV4(), isEdited: false });
    this.setState({ elements: els });
    console.debug('Elements: ', this.state.elements);
  }

  _toggleEditing(key) {
  //  console.debug(key);
    const els = this.state.elements;
    const element = els.find((e) => e.key === key);
    element.isEdited = !element.isEdited;
    this.setState({ elements: els });
  }

  _saveChange(key, change) {
    const els = this.state.elements;
    const element = els.find((e) => e.key === key);
    element.text = change;
    element.isEdited = false;
    this.setState({ elements: els });
  }

  render() {
    console.log(this.state.elements);
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
                if (el.isEdited) {
                  return (<ListItemEditor
                    text={el.text}
                    key={el.key}
                    uid={el.key}
                    removeElement={(key) => this._removeElement(key)}
                    saveChange={(key, change) => this._saveChange(key, change)}
                    toggleEdit={(key) => this._toggleEditing(key)}
                  />);
                }

                return (<ListItemDisplayer
                  text={el.text}
                  key={el.key}
                  uid={el.key}
                  toggleEdit={(key) => this._toggleEditing(key)}
                />);
              })}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this._addNewElement(this.state.currentText);
                  this.setState({ currentText: '' });
                }}
              >
                <input type="text" onChange={(e) => this.setState({ currentText: e.target.value })} value={this.state.currentText} />
                <button type="submit">Add</button>
              </form>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
