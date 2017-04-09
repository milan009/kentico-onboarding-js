import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ItemEdit } from './ItemEdit.jsx';
import { ItemRead } from './ItemRead.jsx';

const ListItem = ({
    item,
    index,
    onSave,
    onCancel,
    onDelete,
    onDoubleClick,
}) => {
  ListItem.displayName = 'ListItem';

  if (item.isEdited) {
    return (
      <ItemEdit
        key={item.id}
        item={item}
        index={(index)}
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
      index={(index)}
      onDoubleClick={onDoubleClick}
    />
  );
};

ListItem.propTypes = {
  item: ImmutablePropTypes.recordOf({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isEdited: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

export { ListItem };
