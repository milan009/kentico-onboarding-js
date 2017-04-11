import * as React from 'react';

interface IErrorBoxProps {
  error: Error;
}

class ErrorBox extends React.PureComponent<IErrorBoxProps, undefined>  {
  static displayName = 'ErrorBox';
  static propTypes = {
    error: React.PropTypes.any.isRequired,
  };

  constructor(props: IErrorBoxProps) {
    super(props);
  }

  render() {
    return (
      <div className="alert alert-danger">
        {this.props.error.message}
      </div>
    );
  }
}

export { ErrorBox };
