import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import { AddLine } from './AddLine.jsx';
import { ListItem } from './ListItem.jsx';
import { Data } from '.././Data.js';
import { createGuid } from '../utils/guidHelper.js';

class List extends PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      lines: new Map(),
    };
  }

  _handleAddLine = (text) => {
    const lines = this.state.lines;
    const id = createGuid();

    const newItem = new Data({ id, text, isEdited: false });
    const editedLines = lines.set(id, newItem);

    this.setState({ lines: editedLines });
  };

  _handleDeleteLine = (lineId) => {
    const rows = this.state.lines;

    const editedRows = rows.delete(lineId);

    this.setState({ lines: editedRows });
  };

  _handleDoubleClick = (id) => {
    const rows = this.state.lines;

    const updatedItems = rows.setIn([id, 'isEdited'], true);

    this.setState({ lines: updatedItems });
  };

  _handleClickSave = (item) => {
    const rows = this.state.lines;
    const itemId = item.id;

    const updatedItem = Data({ 'id': itemId, 'isEdited': false, 'text': [item.text] });
    const updatedItems = rows.mergeIn([itemId], updatedItem);

    this.setState({ lines: updatedItems });
  };

  _handleClickCancel = (id) => {
    const rows = this.state.lines;

    const updatedItems = rows.setIn([id, 'isEdited'], false);

    this.setState({ lines: updatedItems });
  };

  render() {
    const rows = this.state.lines;
    let index = 1;
    const renderedRows = rows.map((row, id) => (
      <li className="list-group-item">
        <ListItem
          key={id}
          line={row}
          index={index++}
          onSave={this._handleClickSave}
          onCancel={this._handleClickCancel}
          onDelete={this._handleDeleteLine}
          onDoubleClick={this._handleDoubleClick}
        />
      </li>
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
              <li className="list-group-item">
                <AddLine onAdd={this._handleAddLine} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export { List };
