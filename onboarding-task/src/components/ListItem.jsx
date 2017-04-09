import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ItemEdit } from './ItemEdit.jsx';
import { ItemRead } from './ItemRead.jsx';

const ListItem = ({
    line,
    index,
    onSave,
    onCancel,
    onDelete,
    onDoubleClick,
}) => {
  ListItem.displayName = 'ListItem';

  if (line.isEdited) {
    return (
      <ItemEdit
        key={line.id}
        line={line}
        index={(index)}
        onSave={onSave}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    );
  }
  return (
    <ItemRead
      key={line.id}
      line={line}
      index={(index)}
      onDoubleClick={onDoubleClick}
    />
  );
};

ListItem.propTypes = {
  line: ImmutablePropTypes.recordOf({
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
