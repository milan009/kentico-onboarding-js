import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { AddLine } from './AddLine.jsx';
import { ListItem } from './ListItem.jsx';

const List = ({
    lines,
    onAddLine,
    onDeleteLine,
    onDoubleClick,
    onClickSave,
    onClickCancel,
  }) => {
  List.displayName = 'List';

  const renderedRows = lines.valueSeq().map((row, index) => (
    <li key={row.id} className="list-group-item">
      <ListItem
        key={row.id}
        line={row}
        index={index + 1}
        onSave={onClickSave}
        onCancel={onClickCancel}
        onDelete={onDeleteLine}
        onDoubleClick={onDoubleClick}
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
              <AddLine onAdd={onAddLine} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

List.propTypes = {
  lines: ImmutablePropTypes.map.isRequired,
  onAddLine: PropTypes.func.isRequired,
  onDeleteLine: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
};

export { List };
