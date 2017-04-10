import * as React from 'react';

import { IAction } from '../actions/IAction';

interface ILoaderCallbackProps {
  fetch: () => Promise<IAction>;
}

interface ILoaderDataProps {
  isFetching: boolean;
}

type ILoaderProps = ILoaderDataProps & ILoaderCallbackProps;

function loaderWithSubscription<TLoadedComponentProps>(LoadedComponent: React.ComponentClass<TLoadedComponentProps> | React.StatelessComponent<TLoadedComponentProps>) {
  return class Loader extends React.PureComponent<ILoaderProps, undefined> {
    static displayName = `Loader(${LoadedComponent.displayName})`;

    componentDidMount() {
      this.props.fetch();
    }

    render() {
      if (this.props.isFetching) {
        return <div className="loader">Loading...</div>;
      }

      return <LoadedComponent { ...this.props } />;
    }
  };
}

export { loaderWithSubscription };
