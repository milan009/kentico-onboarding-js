import { IItemAction } from '../interfaces/IItemAction';
const { connect } = require('react-redux');
import { List as ListComponent } from '../components/List';
import { addItem } from '../actions/actionCreators';
import { IListState } from '../interfaces/IListState';

const mapStateToProps = (state: IListState) => {
  return {
    itemsOrder: state.itemsOrder,
  };
};

const mapDispatchToProps = (dispatch: (itemAction: IItemAction) => IItemAction) => {
  return {
    onAddItem: (text: string) => dispatch(addItem(text)),
  };
};

const List = connect(mapStateToProps, mapDispatchToProps)(ListComponent);

export { List };

