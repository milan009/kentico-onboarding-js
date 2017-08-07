import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { AddItem } from '../containers/AddItem.jsx';
import { ListItem } from '../containers/ListItem.jsx';

const List = (props) => {
  const existingItems = props.itemIds.map((id, index) =>
    <li className="list-group-item" key={id}>
      <ListItem
        index={index + 1}
        id={id}
        key={id}
      />
    </li>
  );

  return (
    <div className="row">
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ol className="list-group">
          {existingItems}
          <AddItem />
        </ol>
      </div>
    </div>
  );
};

List.displayName = 'List';

List.propTypes = {
  itemIds: ImmutablePropTypes.iterableOf(PropTypes.string).isRequired,
};

export { List };
