const { connect } = require('react-redux');
import { Dispatch } from 'redux';

import { addItem} from '../actions/itemsActionCreators';
import { List } from '../components/List';
import { IAppState } from '../stores/IAppState';
import { IAction } from '../actions/IAction';

const mapStateToProps = (state: IAppState) => {
  return {
    list: state.itemOrder,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    addItem: (text: string) => dispatch(addItem(text)),
  };
};

const ListContainer: React.ComponentClass<undefined> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
