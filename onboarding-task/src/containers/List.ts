import { connect } from 'react-redux';
import { Dispatch } from '../stores/Dispatch';
import { addItem} from '../actions/itemsActionCreators';
import { List } from '../components/List';
import { IAppState } from '../stores/IAppState';

const mapStateToProps = (state: IAppState) => {
  return {
    itemIds: state.itemsOrder,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addItem: (text: string) => dispatch(addItem(text)),
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
