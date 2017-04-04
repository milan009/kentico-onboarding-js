import { connect } from 'react-redux';

import { loadingWrapper } from '../components/loadingWrapper';
import { ListContainer } from './ListContainer';
import { IAppState } from '../interfaces/IAppState';
import { fetchItems } from '../actionCreators/fetchItemsActionCreators';
import { dispatchType } from '../utils/dispatchType';

const mapStateToProps = (state: IAppState) => {
  return {
    isLoading: state.items.isFetching,
  };
};

const mapDispatchToProps = (dispatch: dispatchType) => {
  return {
    onMountCallback: () => dispatch(fetchItems()),
  };
};

const WrappedListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(loadingWrapper(ListContainer));

export { WrappedListContainer };
