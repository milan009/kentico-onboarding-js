import React, { PropTypes } from 'react';
import { LineEdit } from './LineEdit.jsx';
import { LineRead } from './LineRead.jsx';

const ListItem = (props) => {
  if (props.line.isEdited) {
    return (
      <LineEdit
        key={props.line.id}
        line={props.line}
        index={(props.index)}
        onSave={props.onSave}
        onCancel={props.onCancel}
        onDelete={props.onDelete}
      />
    );
  }
  return (
    <LineRead
      key={props.line.id}
      line={props.line}
      index={(props.index)}
      onDoubleClick={props.onDoubleClick}
    />
  );
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  line: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

export { ListItem };
