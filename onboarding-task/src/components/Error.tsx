import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ThunkAction } from '../interfaces/IAction';
import { IRequestError } from '../interfaces/IRequestError';

export interface IErrorCallbackProps {
  onResendRequest: (action: ThunkAction) => void;
}

export interface IEditItemDataProps {
  requestError: IRequestError;
}

class Error extends React.PureComponent<IErrorCallbackProps & IEditItemDataProps> {

  static displayName = 'Error';

  static propTypes = {
    onResendRequest: PropTypes.func.isRequired,
  };

  constructor(props: IErrorCallbackProps & IEditItemDataProps) {
    super(props);
  }

  _resendAction = () => this.props.onResendRequest(this.props.requestError.action);

  render() {
    return (
      <div className="alert alert-danger col-md-8 col-md-push-2 row">
        <span className="col-md-8 text-center">
          <span className="glyphicon glyphicon-warning-sign" />
          <strong> Following error was encountered: </strong>
          {this.props.requestError.error.message}
        </span>
        <button
          className="btn btn-default btn-primary col-md-3 col-md-push-1"
          onClick={this._resendAction}
        >
          <span className="glyphicon glyphicon-repeat" />
          <span> Resend request</span>
        </button>
      </div>
    );
  }
}

export { Error };
