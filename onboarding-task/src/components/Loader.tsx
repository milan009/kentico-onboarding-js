import * as React from 'react';
import { ComponentElement } from 'react';

import { IAction } from '../actions/IAction';

interface ILoaderProps {
  fetch: () => Promise<IAction>;
  isFetching: boolean;
  component: ComponentElement<any, any>;
}

class Loader extends React.PureComponent<ILoaderProps, undefined> {
  static displayName = 'Loader';

  static propTypes = {
    fetch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    component: React.PropTypes.node.isRequired,
  };

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    if (this.props.isFetching) {
      return <div className="loader">Loading...</div>;
    }

    return this.props.component;
  }
}

export { Loader };
