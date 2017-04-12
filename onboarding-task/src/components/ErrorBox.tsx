import * as React from 'react';

interface IErrorBoxProps {
  error: Error;
}

const ErrorBox: React.StatelessComponent<IErrorBoxProps> = (props: IErrorBoxProps) => (
  <div className="alert alert-danger">
    {props.error.message}
  </div>
);

ErrorBox.propTypes = {
  error: React.PropTypes.any.isRequired,
};

export { ErrorBox };



