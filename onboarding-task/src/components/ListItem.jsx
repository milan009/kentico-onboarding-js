import React, { PropTypes } from 'react';
import { InsertedListItem } from './InsertedListItem';
import { EditedListItem } from './EditedListItem';

const ListItem = (props) => {
  if (props.data.editing) {
    return (
      <EditedListItem
        text={props.data.textShown}
        index={props.index}
        saveFunction={props.saveFunction}
        deleteFunction={props.deleteFunction}
        updateFunction={props.updateFunction}
        cancelFunction={props.cancelFunction}
        editFunction={props.editFunction}
      />
    );
  }

  return (
    <InsertedListItem
      text={props.data.textShown}
      index={props.index}
      key={props.data.id}
      editFunction={props.editFunction}
    />
  );
};

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  saveFunction: PropTypes.func.isRequired,
  deleteFunction: PropTypes.func.isRequired,
  updateFunction: PropTypes.func.isRequired,
  cancelFunction: PropTypes.func.isRequired,
  editFunction: PropTypes.func.isRequired,
};

ListItem.displayName = 'ListItem';

export { ListItem };
