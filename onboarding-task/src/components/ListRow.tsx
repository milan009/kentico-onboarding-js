import * as React from 'react';
import { ListRowDisplay } from './ListRowDisplay';
import { ListRowEdit } from './ListRowEdit';
import { IItemViewModel } from '../interfaces/IItemViewModel';
import { IAction } from '../interfaces/IAction';

const { PropTypes } = React;

interface IListRowProps {
  item: IItemViewModel;
  onItemUpdate: (text: string) => IAction;
  onItemDelete: () => IAction;
  onItemCancel: () => IAction;
  onItemClick: () => IAction;
}

const ListRow: React.StatelessComponent<IListRowProps> = (props) => {
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
};

ListRow.displayName = 'ListRow';

ListRow.propTypes = {
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onItemUpdate: PropTypes.func.isRequired,
  onItemDelete: PropTypes.func.isRequired,
  onItemCancel: PropTypes.func.isRequired,
};

export { ListRow };
