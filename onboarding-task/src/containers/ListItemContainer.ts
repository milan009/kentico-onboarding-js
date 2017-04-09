import {IAppState} from '../stores/IAppState';
import {connect} from 'react-redux';

import {IListItemCallbacksProps, IListItemDataProps, ListItem} from '../components/ListItem';
import { Dispatch } from '../stores/Dispatch';
import {deleteItem, editItem, toggleItemViewMode} from '../actions/actionCreators';

interface IListItemContainerProps {
  id: string;
}

function mapStateToProps(state: IAppState, ownProps: IListItemContainerProps) : IListItemDataProps{
  return {
    item: state.items.get(ownProps.id),

    // ToDo: Find Index more gracefully?
    index: state.itemsOrder.toIndexedSeq().indexOf(ownProps.id) + 1,
    isInEditMode: state.itemsDisplayFlags.getIn([ownProps.id, 'editMode']),
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: IListItemContainerProps) : IListItemCallbacksProps{
  return {
    onItemValueEdit: (value: string) => dispatch(editItem(ownProps.id, value)),
    onDelete: () => dispatch(deleteItem(ownProps.id)),
    onViewChange: () => dispatch(toggleItemViewMode(ownProps.id)),
  };
}

const ListItemContainer: React.ComponentClass<IListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ListItem);

export { ListItemContainer as ListItem }
