import React, { PureComponent, PropTypes } from 'react';
import { Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { AddLine } from './AddLine.jsx';
import { ListItem } from './ListItem.jsx';

const List = ({
    lines,
    _handleAddLine,
    _handleDeleteLine,
    _handleDoubleClick,
    _handleClickSave,
    _handleClickCancel,
}) => {
  List.displayName = 'List';

  const renderedRows = lines.valueSeq().map((row, index) => (
    <li key={row.id} className="list-group-item">
      <ListItem
        key={row.id}
        line={row}
        index={index + 1}
        onSave={_handleClickSave}
        onCancel={_handleClickCancel}
        onDelete={_handleDeleteLine}
        onDoubleClick={_handleDoubleClick}
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
              <AddLine onAdd={_handleAddLine} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

List.propTypes = {
  lines: ImmutablePropTypes.map.isRequired,
  _handleAddLine: PropTypes.func.isRequired,
  _handleDeleteLine: PropTypes.func.isRequired,
  _handleDoubleClick: PropTypes.func.isRequired,
  _handleClickSave: PropTypes.func.isRequired,
  _handleClickCancel: PropTypes.func.isRequired,
};

export { List };
