import { connect } from 'react-redux';

import { loadingWrapper, ILoadingWrapperDataProps, ILoadingWrapperCallbacksProps } from '../components/utilComponents/loadingWrapper';
import { ListContainer } from './ListContainer';
import { IAppState } from '../interfaces/IAppState';
import { fetchItems } from '../actionCreators/fetchItemsActionCreators';
import { dispatchType } from '../utils/dispatchType';

const mapStateToProps = (state: IAppState): ILoadingWrapperDataProps => {
  return {
    isLoading: state.items.isFetching,
  };
};

const mapDispatchToProps = (dispatch: dispatchType): ILoadingWrapperCallbacksProps => {
  return {
    onMountCallback: () => dispatch(fetchItems()),
  };
};

const WrappedListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(loadingWrapper(ListContainer));

export { WrappedListContainer };
