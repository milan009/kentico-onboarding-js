import React, { PropTypes } from 'react';
import { InsertedListItem } from './InsertedListItem';
import { EditedListItem } from './EditedListItem';

const ListItem = (props) => {
  if (props.data.isEditing) {
    return (
      <EditedListItem
        index={props.index}
        id={props.id}
        text={props.data.textShown}
        onSave={props.onSave}
        onDelete={props.onDelete}
        onUpdate={props.onUpdate}
        onCancel={props.onCancel}
        onEdit={props.onEdit}
      />
    );
  }

  return (
    <InsertedListItem
      text={props.data.textShown}
      index={props.index}
      id={props.id}
      onEdit={props.onEdit}
    />
  );
};

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

ListItem.displayName = 'ListItem';

export { ListItem };
