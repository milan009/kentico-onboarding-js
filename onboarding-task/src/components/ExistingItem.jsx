import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DisplayItem from './DisplayItem';
import EditItem from '../containers/EditItem';

const ExistingItem = props => {
  if (props.isEdited) {
    return (
      <EditItem
        index={props.index}
        item={props.item}
      />
    );
  }

  return (
    <DisplayItem
      index={props.index}
      onItemClick={props.enableEdition}
      item={props.item}
    />
  );
};

ExistingItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: ImmutablePropTypes.recordOf({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  isEdited: PropTypes.bool.isRequired,
  enableEdition: PropTypes.func.isRequired,
};

export default ExistingItem;
