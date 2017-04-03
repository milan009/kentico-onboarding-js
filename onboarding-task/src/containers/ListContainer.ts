import { connect } from 'react-redux';

import { List } from '../components/List';
import { IAppState } from '../interfaces/IAppState';
import { dispatchType } from '../utils/dispatchType';
import { createListItem } from '../actionCreators/actionCreators';

const mapStateToProps = (state: IAppState) => {
  return {
    itemsOrder: state.items.orderedIds,
    error: state.items.error,
    successMessage: state.items.successMessage,
  };
};

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
