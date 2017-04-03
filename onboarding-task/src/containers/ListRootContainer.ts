import { connect } from 'react-redux';

import { ListRoot } from '../components/ListRoot';
import { IAppState } from '../interfaces/IAppState';
import { fetchItems } from '../actionCreators/fetchItemsActionCreators';
import { dispatchType } from '../utils/dispatchType';

const mapStateToProps = (state: IAppState) => {
  return {
    isFetching: state.items.isFetching,
  };
};

const mapDispatchToProps = (dispatch: dispatchType) => {
  return {
    onListMount: () => dispatch(fetchItems()),
  };
};

const ListRootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListRoot);

export { ListRootContainer };
