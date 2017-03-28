import React, {
  PropTypes,
} from 'react';
import { ListRowDisplay } from './ListRowDisplay.jsx';
import { ListRowEdit } from './ListRowEdit.jsx';

function ListRow(props) {
  if (props.item.editing) {
    return (
      <ListRowEdit
        item={props.item}
        onItemUpdate={props.onItemUpdate}
        onItemDelete={props.onItemDelete}
        onItemCancel={props.onItemCancel}
      />
    );
  }
  return (
    <ListRowDisplay
      item={props.item}
      onItemClick={props.onItemClick}
    />
  );
}

ListRow.displayName = 'ListRow';

ListRow.propTypes = {
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onItemUpdate: PropTypes.func.isRequired,
  onItemDelete: PropTypes.func.isRequired,
  onItemCancel: PropTypes.func.isRequired,
};

export { ListRow };
