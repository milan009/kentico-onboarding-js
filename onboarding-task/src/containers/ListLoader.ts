import { ComponentClass } from 'react';
import { connect } from 'react-redux';

import { Dispatch } from '../stores/Dispatch';
import { fetchItems } from '../actions/itemsActionCreators';
import { List } from '../containers/List';
import { IAppState } from '../stores/IAppState';
import { loaderWithSubscription } from '../components/Loader';

const mapStateToProps = (state: IAppState) => {
  return {
    isFetching: state.isFetching,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetch: () => dispatch(fetchItems()),
  };
};

const ListLoaderContainer: ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(loaderWithSubscription(List));

export { ListLoaderContainer as ListLoader };
