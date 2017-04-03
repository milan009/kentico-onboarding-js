import * as React from 'react';
import { ListRowDisplay } from './ListRowDisplay';
import { ListRowEdit } from './ListRowEdit';
import { IItemViewModel } from '../interfaces/IItemViewModel';
import { IAction } from '../interfaces/IAction';

interface IListRowProps {
  item: IItemViewModel;
  onItemUpdate: (text: string) => IAction;
  onItemDelete: () => IAction;
  onItemCancel: () => IAction;
  onItemClick: () => IAction;
}

const ListRow: React.StatelessComponent<IListRowProps> = (props) => {
  if (props.item.editFormVisible) {
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
  item: React.PropTypes.object.isRequired,
  onItemClick: React.PropTypes.func.isRequired,
  onItemUpdate: React.PropTypes.func.isRequired,
  onItemDelete: React.PropTypes.func.isRequired,
  onItemCancel: React.PropTypes.func.isRequired,
};

export { ListRow };
