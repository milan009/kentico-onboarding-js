import { connect } from 'react-redux';

import { List } from '../components/List';
import { createListItem } from '../actionCreators/actionCreators';
import { IAppState } from '../interfaces/IAppState';
import { dispatchType } from '../utils/dispatchType';

const mapStateToProps = (state: IAppState) => {
  return {
    itemsOrder: state.items.orderedIds,
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
