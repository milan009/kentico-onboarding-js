import React = require('react');

import { Loader } from './Loader';


interface ILoadingWrapperDataProps {
  isLoading: boolean;
}

interface ILoadingWrapperCallbacksProps {
  onMountCallback: () => any;
}

const loadingWrapper = (WrappedComponent: React.ComponentClass<ILoadingWrapperDataProps & ILoadingWrapperCallbacksProps>) => {
  return class extends React.PureComponent<ILoadingWrapperDataProps & ILoadingWrapperCallbacksProps, undefined> {

    static displayName = `Loading Wrapper (${(WrappedComponent as any).displayName})`;

    componentWillMount() {
      this.props.onMountCallback();
    }

    render() {
      if (this.props.isLoading) {
        return <Loader />;
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  };
};

export { loadingWrapper, ILoadingWrapperDataProps, ILoadingWrapperCallbacksProps };

