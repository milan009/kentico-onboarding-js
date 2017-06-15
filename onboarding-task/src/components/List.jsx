import React, { Component } from 'react';
import assignment from './../../../assignment.gif';

import TsComponent from './TsComponent.tsx';
import { ListItem } from './ListItem';
// import { ListItem } from './ListItem';

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      currentText: '',
      idHolder: 0,
    };
  }

  _removeElement(elementId) {
    const elId = this.state.elements.indexOf(this.state.elements.find((el) => el.props.itemId === elementId));

    const els = this.state.elements;
    els.splice(elId, 1);
    this.setState({ elements: els });
  }

  _addNewElement(elementText) {
    const els = this.state.elements;
    els.push(<ListItem text={elementText} key={this.state.idHolder} itemId={this.state.idHolder} removeFunction={(elId) => this._removeElement(elId)} />);
    this.setState({ elements: els, idHolder: this.state.idHolder + 1 });
  }

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
              {this.state.elements}
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
