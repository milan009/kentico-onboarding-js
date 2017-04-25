import * as React from 'react';
import { IAction } from '../actions/IAction';

interface IErrorBoxProps {
  index: number;
  error: string;
  deleteError: (id: number) => IAction;
}

const ErrorBox: React.StatelessComponent<IErrorBoxProps> = (props: IErrorBoxProps) => (
  <div className="alert alert-danger">
    <a className="close" onClick={() => props.deleteError(props.index)}>&times;</a>
    {props.error}
  </div>

);

ErrorBox.propTypes = {
  error: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  deleteError: React.PropTypes.func.isRequired,
};

export { ErrorBox };
