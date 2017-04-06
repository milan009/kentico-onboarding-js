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
    fetch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    component: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    if (this.props.isFetching) {
      return <div className="loader">Loading...</div>;
    }

    return React.createElement(this.props.component);
  }
}

export { Loader };
