import React, { Component } from 'react';
import AddLine from './AddLine.jsx';
import LineEdit from './LineEdit.jsx';
import LineRead from './LineRead.jsx';
import createGuid from '../GuidHelper.js';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineTexts: [],
    };
  }

  _handleAddLine = (text) => {
    const editedLines = this.state.lineTexts
      .concat([{
        id: createGuid(),
        text,
        isEdited: false,
      }]);

    this.setState({ lineTexts: editedLines });
  };

  _handleDeleteLine = (lineId) => {
    this.setState(
      {
        lineTexts: this.state.lineTexts
          .slice()
          .filter((line) => line.id !== lineId),
      }
    );
  };

  _handleDoubleClick = (id) => {
    const clickedItem = this.state.lineTexts
      .find(
        (lineText) => lineText.id === id
      );
    const indexOfClickedItem = this.state.lineTexts
      .indexOf(clickedItem);
    const updatedItems = this.state.lineTexts.slice();
    updatedItems[indexOfClickedItem] = Object
      .assign(
        {}, clickedItem, { isEdited: true }
      );

    this.setState({ lineTexts: updatedItems });
  };

  _handleClickSave = (item) => {
    const clickedItem = this.state.lineTexts
      .find(
        (lineText) => lineText.id === item.id
      );
    const indexOfClickedItem = this.state.lineTexts
      .indexOf(clickedItem);
    const updatedItems = this.state.lineTexts.slice();
    updatedItems[indexOfClickedItem] = Object
      .assign(
        {}, clickedItem, { isEdited: false, text: item.text }
      );

    this.setState({ lineTexts: updatedItems });
  };

  _handleClickCancel = (id) => {
    const items = this.state.lineTexts;
    const item = items.find((i) => i.id === id);
    const updatedItem = Object
      .assign(
        {}, item, { isEdited: false }
      );
    const updatedItems = items.slice();
    updatedItems[items.indexOf(item)] = updatedItem;

    this.setState(
      {
        lineTexts: updatedItems,
      }
    );
  };

  _renderLines = () => {
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
  };

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center"><b>Note: </b>Try to make the solution easily extensible (e.g. more displayed fields per item).</p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            {this._renderLines()}
          </div>
        </div>
      </div>
    );
  }
}

export default List;
