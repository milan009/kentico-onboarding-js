import React, { Component } from 'react';
import assignment from './../../../assignment.gif';
// import Line from './Line.jsx';
import AddLine from './AddLine.jsx';
import LineEdit from './LineEdit.jsx';
import LineRead from './LineRead.jsx';
// import { createGuid } from '../GuidHelper.js';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineTexts: [],
    };
    this._handleAddLine = this._handleAddLine.bind(this);
    this._renderLines = this._renderLines.bind(this);
    this._handleDeleteLine = this._handleDeleteLine.bind(this);
    this._handleDoubleClick = this._handleDoubleClick.bind(this);
    this._handleClickSave = this._handleClickSave.bind(this);
    this._handleClickCancel = this._handleClickCancel.bind(this);
  }
  _handleAddLine(text) {
    let lineTexts = this.state.lineTexts.slice();
    const newText = text;
    const newId = createGuid();
    const newIsEdited = false;
    lineTexts = lineTexts.concat([{ id: newId, text: newText, isEdited: newIsEdited }]);
    this.setState({ lineTexts });
  }

  _handleDeleteLine(lineId) {
    const lineTexts = this.state.lineTexts.slice();
    console.log('id: ' + lineId);
    const updatedLineTexts = lineTexts.filter((line) => line.id !== lineId);
    this.setState({ lineTexts: updatedLineTexts });
  }

  _handleDoubleClick(id) {
    const items = this.state.lineTexts;

    const clickedItem = this.state.lineTexts.find((lineText) => lineText.id === id);
    const indexOfClickedItem = this.state.lineTexts.indexOf(clickedItem);
    const updatedItem = Object.assign({}, clickedItem, { isEdited: true });
    const updatedItems = items.slice();
    updatedItems[indexOfClickedItem] = updatedItem;
    this.setState({ lineTexts: updatedItems });
  }
  // TODO: reuse for safe
  _handleChange(event) {
    const id = event.id;
    const text = event.text;
    const items = this.state.lineTexts;

    const clickedItem = this.state.lineTexts.find((lineText) => lineText.id === id);
    const indexOfClickedItem = this.state.lineTexts.indexOf(clickedItem);

    const updatedItem = Object.assign({}, clickedItem, { text });
    const updatedItems = items.slice();
    updatedItems[indexOfClickedItem] = updatedItem;
    this.setState({ lineTexts: updatedItems });
    console.log('handleChange: ', id);
  }

  _handleClickSave(item) {
    const items = this.state.lineTexts;
    const id = item.id;
    const text = item.text;

    const clickedItem = this.state.lineTexts.find((lineText) => lineText.id === id);
    const indexOfClickedItem = this.state.lineTexts.indexOf(clickedItem);

    const updatedItem = Object.assign({}, clickedItem, { isEdited: false, text });
    const updatedItems = items.slice();
    updatedItems[indexOfClickedItem] = updatedItem;
    this.setState({ lineTexts: updatedItems });
  }

  _handleClickCancel(id) {
    const items = this.state.lineTexts;
    const item = items.find((i) => i.id === id);

    const updatedItem = Object.assign({}, item, { isEdited: false });
    const indexOfItem = items.indexOf(item);
    const updatedArray = items.slice();
    updatedArray[indexOfItem] = updatedItem;

    this.setState({ lineTexts: updatedArray });
  }

  _renderLines() {
    const items = this.state.lineTexts.map((line, index) => (
      line.isEdited
        ? <LineEdit
          id={line.id}
          key={line.id}
          text={line.text}
          number={(index + 1)}
          onSave={this._handleClickSave}
          onCancel={this._handleClickCancel}
          onDelete={this._handleDeleteLine}
        />
        : <LineRead
          id={line.id}
          key={line.id}
          text={line.text}
          number={(index + 1)}
          onDoubleClick={this._handleDoubleClick}
        />
      )
    );

    return (
      <ul id="todo-list" className="list-group">
        {items}
        <AddLine onAdd={this._handleAddLine} />
      </ul>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">The desired functionality is captured in the gif image. </p>
            <p className="lead text-center"><b>Note: </b>Try to make the solution easily extensible (e.g. more displayed fields per item).</p>
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
              {/* // TODO: implement the list here :) */}
              {this._renderLines()}
          </div>
        </div>
      </div>
    );
  }
}

function createGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export default List;
