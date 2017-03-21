import React, { Component } from 'react';
import { AddLine } from './AddLine.jsx';
import { LineEdit } from './LineEdit.jsx';
import { LineRead } from './LineRead.jsx';
import { createGuid } from '../GuidHelper.js';

class List extends Component {

  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
  }

  _handleAddLine = (text) => {
    const lines = this.state.rows;
    const editedLines = lines
      .concat([{
        id: createGuid(),
        text,
        isEdited: false,
      }]);

    this.setState({ rows: editedLines });
  };

  _handleDeleteLine = (lineId) => {
    const rows = this.state.rows;
    const editedRows = rows
      .slice()
      .filter((line) => line.id !== lineId);

    this.setState(
      { rows: editedRows }
    );
  };

  _handleDoubleClick = (id) => {
    const rows = this.state.rows;
    const clickedItem = rows
      .find((row) => row.id === id);
    const indexOfClickedItem = this.state.rows
      .indexOf(clickedItem);
    const updatedItems = this.state.rows.slice();
    const updatedItem = Object
      .assign({}, clickedItem, { isEdited: true });

    updatedItems[indexOfClickedItem] = updatedItem;

    this.setState({ rows: updatedItems });
  };

  _handleClickSave = (item) => {
    const rows = this.state.rows;
    const clickedItem = rows
      .find(
        (row) => row.id === item.id
      );
    const indexOfClickedItem = rows
      .indexOf(clickedItem);
    const updatedItems = rows.slice();
    const updatedItem = Object
      .assign({}, clickedItem, { isEdited: false, text: item.text });
    updatedItems[indexOfClickedItem] = updatedItem;

    this.setState({ rows: updatedItems });
  };

  _handleClickCancel = (id) => {
    const items = this.state.rows;
    const item = items.find((i) => i.id === id);
    const updatedItem = Object
      .assign({}, item, { isEdited: false });
    const updatedItems = items.slice();
    updatedItems[items.indexOf(item)] = updatedItem;

    this.setState(
      { rows: updatedItems }
    );
  };

  _renderLine = (line, index) => {
    if (line.isEdited) {
      return (
        <LineEdit
          id={line.id}
          key={line.id}
          text={line.text}
          number={(index + 1)}
          onSave={this._handleClickSave}
          onCancel={this._handleClickCancel}
          onDelete={this._handleDeleteLine}
        />
      );
    }
    return (
      <LineRead
        id={line.id}
        key={line.id}
        text={line.text}
        number={(index + 1)}
        onDoubleClick={this._handleDoubleClick}
      />
    );
  };

  render() {
    const rows = this.state.rows;
    const renderedRows = rows.map((line, index) => (

      this._renderLine(line, index)
    ));
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center"><b>Note: </b>Try to make the solution easily extensible (e.g. more displayed fields per item).</p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <ul id="todo-list" className="list-group">
              {renderedRows}
              <AddLine onAdd={this._handleAddLine} />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export { List };
