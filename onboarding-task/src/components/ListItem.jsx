import React, { PropTypes } from 'react';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import { ItemEdit } from './ItemEdit.jsx';
import { ItemRead } from './ItemRead.jsx';

const ListItem = ({
    item,
    onSave,
    onCancel,
    onDelete,
    onDoubleClick,
}) => {
  if (item.isEdited) {
    return (
      <ItemEdit
        key={item.id}
        item={item}
        onSave={onSave}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    );
  }
  return (
    <ItemRead
      key={item.id}
      item={item}
      onDoubleClick={onDoubleClick}
    />
  );
};

ListItem.displayName = 'ListItem';
ListItem.propTypes = {
  // item: ImmutablePropTypes.recordOf({
  //   id: PropTypes.string.isRequired,
  //   text: PropTypes.string.isRequired,
  //   isEdited: PropTypes.bool.isRequired,
  //   index: PropTypes.number.isRequired,
  // }).isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isEdited: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

export { ListItem };
