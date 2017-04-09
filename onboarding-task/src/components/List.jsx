import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { AddItem } from './AddItem.jsx';
import { ListItemContainer } from '../containers/ListItemContainer';

const List = ({
    items,
    onAddLine,
  }) => {
  List.displayName = 'List';

  const renderedRows = items.valueSeq().map((line, index) => (
    <li key={line.id} className="list-group-item">
      <ListItemContainer line={line} index={index + 1} />
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
              <AddItem onAdd={onAddLine} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

List.propTypes = {
  items: ImmutablePropTypes.map.isRequired,
  onAddLine: PropTypes.func.isRequired,
};

export { List };
