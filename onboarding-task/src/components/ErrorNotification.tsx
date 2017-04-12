import * as React from 'react';
import { OrderedMap } from 'immutable';
const ImmutablePropTypes = require('react-immutable-proptypes');

import { IAction } from '../actions/IAction';
import { IErrorMessage } from '../models/ErrorMessage';

interface IErrorMessageDetailProps {
  deleteErrorMessage: (id: string) => IAction;
  errorMessage: IErrorMessage;
}

const ErrorMessageDetail: React.StatelessComponent<IErrorMessageDetailProps> = ({ deleteErrorMessage, errorMessage}) => (
  <div className="alert alert-danger alert-dismissable fade in" key={errorMessage.id}>
    <a
      className="close"
      data-dismiss="alert"
      aria-label="close"
      onClick={() => deleteErrorMessage(errorMessage.id)}
    >
      &times;
    </a>
    <strong>Error!</strong> {errorMessage.message}
  </div>
);

ErrorMessageDetail.displayName = 'ErrorMessageDetail';

interface IErrorNotificationProps {
  errorMessages: OrderedMap<string, IErrorMessage>;
  deleteErrorMessage: (id: string) => IAction;
}

const ErrorNotification: React.StatelessComponent<IErrorNotificationProps> = ({errorMessages, deleteErrorMessage}) => (
  errorMessages ?
    (<div>{errorMessages.valueSeq().map((errorMessage: IErrorMessage) =>
      (<ErrorMessageDetail
        errorMessage={errorMessage}
        key={errorMessage.id}
        deleteErrorMessage={deleteErrorMessage}
      />))}
    </div>)
    : <noscript/>

);

ErrorNotification.displayName = 'ErrorNotification';

ErrorNotification.propTypes = {
  errorMessages: ImmutablePropTypes.orderedMapOf(
    ImmutablePropTypes.recordOf({
      id: React.PropTypes.string.isRequired,
      message: React.PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteErrorMessage: React.PropTypes.func.isRequired,
};

export { ErrorNotification };
