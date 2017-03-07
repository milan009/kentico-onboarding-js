import { connect } from 'react-redux';

import { List } from '../components/List';
import { createListItem } from '../actionCreators/actionCreators';
import { IAction } from '../interfaces/IAction';
import { IAppState } from '../interfaces/IAppState';

const mapStateToProps = (state: IAppState) => {
  return {
    itemsOrder: state.items.orderedIds,
  };
};

type dispatchType = (action: IAction) => IAction;

const mapDispatchToProps = (dispatch: dispatchType) => {
  return {
    onListItemAdd: (text: string) => dispatch(createListItem(text)),
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export { ListContainer };
