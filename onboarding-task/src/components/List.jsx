import React, { Component } from 'react';
import assignment from './../../../assignment.gif';

import TsComponent from './TsComponent.tsx';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfListItems: ['listItem1'],
    };
  }
  _ChangeTextOnListItem(newText, index) {
    console.log(`${newText}:${index}`);
    const newListOfListItems = this.state.listOfListItems;
    newListOfListItems[index] = newText;
    this.setState({ listOfListItems: newListOfListItems });
  }

  render() {
    const listItems = this.state.listOfListItems.map((x, i) => {
      return <ListItem text={x} updateFunction={this._ChangeTextOnListItem} index={i} key={i} />;
    }
    );
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
            <pre>
              {listItems}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

class ListItem extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    updateFunction: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      added: false,
      editPhase: false,
    };
    this._Add = this._Add.bind(this);
    this._Edit = this._Edit.bind(this);
    this._CancelEdit = this._CancelEdit.bind(this);
    this._Delete = this._Delete.bind(this);
    this._Save = this._Save.bind(this);
    this._OnInputChange = this._OnInputChange.bind(this);
  }
  _Add() {
    this.setState({ added: true });
    this.props.updateFunction(this.state.text, this.props.index);
  }
  _Edit() {
    this.setState({ editPhase: this.state.added });
  }
  _CancelEdit() {
    this.setState({ editPhase: false });
    this.setState({ text: this.props.text });
  }
  _Delete() {
    alert('not implemented');
  }
  _Save() {
    this.setState({ editPhase: false });
    this.props.updateFunction(this.state.text, this.props.index);
  }
  _OnInputChange(e) {
    this.setState({ text: e.target.input });
  }
  render() {
    const hideAddPhase = this.state.added;
    const hideEditPhase = !this.state.editPhase || !this.state.added;
    return (
      <div>
        {/* // TODO Implement text update */}
        <input value={this.state.text} onClick={this._Edit} onChange={this._OnInputChange} />
        <button hidden={hideAddPhase} onClick={this._Add}>Add</button>
        <button hidden={hideEditPhase} onClick={this._Save}>Save</button>
        <button hidden={hideEditPhase} onClick={this._CancelEdit}>Cancel</button>
        <button hidden={hideEditPhase} onClick={this._Delete}>Delete</button>
      </div>
    );
  }
}

export default List;
