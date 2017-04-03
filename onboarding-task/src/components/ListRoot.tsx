import React = require('react');

import { Loader } from './Loader';
import { ListContainer } from '../containers/ListContainer';
import { IAction } from '../interfaces/IAction';

interface ListRootProps {
  readonly isFetching: boolean;
  readonly onListMount: () => Promise<IAction>;
}

class ListRoot extends React.PureComponent<ListRootProps, undefined> {

  static displayName = 'ListRoot';

  componentWillMount() {
    this.props.onListMount();
  }

  render() {
    if (this.props.isFetching) {
      return <Loader />;
    } else {
      return <ListContainer />;
    }
  }
}

export { ListRoot };

