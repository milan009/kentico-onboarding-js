import { connect } from 'react-redux';

import { List, IListDataProps, IListCallbacksProps } from '../components/List';
import { IAppState } from '../interfaces/IAppState';
import { dispatchType } from '../utils/dispatchType';
import { createListItem } from '../actionCreators/actionCreators';

const mapStateToProps = (state: IAppState): IListDataProps => {
  return {
    itemsOrder: state.items.orderedIds,
    error: state.items.error,
    successMessage: state.items.successMessage,
  };
};

const mapDispatchToProps = (dispatch: dispatchType): IListCallbacksProps => {
  return {
    onListItemAdd: (text: string) => dispatch(createListItem(text)),
  };
};

const ListContainer: React.ComponentClass<any> = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export { ListContainer };
