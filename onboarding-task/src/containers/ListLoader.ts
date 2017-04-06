import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import { createElement } from 'react';

import { Dispatch } from '../stores/Dispatch';
import { fetchItems } from '../actions/itemsActionCreators';
import { List } from '../containers/List';
import { IAppState } from '../stores/IAppState';
import { Loader } from '../components/Loader';

const mapStateToProps = (state: IAppState) => {
  return {
    isFetching: state.isFetching,
    component: createElement(List),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetch: () => dispatch(fetchItems),
  };
};

const ListLoaderContainer: ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loader);

export { ListLoaderContainer as ListLoader };
