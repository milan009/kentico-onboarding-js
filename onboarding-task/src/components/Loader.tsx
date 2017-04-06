import * as React from 'react';

import { IAction } from '../actions/IAction';

interface ILoaderProps {
  fetch: () => Promise<IAction>;
  isFetching: boolean;
  component: React.ComponentClass<any>;
}

class Loader extends React.PureComponent<ILoaderProps, undefined> {
  static displayName = 'Loader';

  static propTypes = {

  };

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    if (this.props.isFetching) {
      return <div className="loader">Loading...</div>;
    } else {
      return React.createElement(this.props.component);
    }
  }
}

export { Loader };
