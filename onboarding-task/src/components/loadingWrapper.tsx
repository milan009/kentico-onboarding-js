import React = require('react');

import { Loader } from './Loader';


interface IProps {
  isLoading: boolean;
  onMountCallback: () => any;
}

const loadingWrapper = (WrappedComponent: React.ComponentClass<IProps>) => {
  return class extends React.PureComponent<IProps, undefined> {

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

export { loadingWrapper };

