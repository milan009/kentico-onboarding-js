import * as React from 'react';
import { OrderedMap } from 'immutable';
const ImmutablePropTypes = require('react-immutable-proptypes');
import { ErrorMessage } from './ErrorMessage';
const CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');
import './errorsContainer.css';

interface IErrorsContainerProps {
  errors: OrderedMap<string, string>;
  onDismissError: (key: string) => void;
}

const ErrorsContainer: React.StatelessComponent<IErrorsContainerProps> = (props) => {
  const messages = props.errors.map((v: string, k: string) =>
    (<ErrorMessage
      key={k}
      errorId={k}
      text={v}
      onDismissError={props.onDismissError} />)
  ).toArray();

  return (
    <div className="alert-container">
      <CSSTransitionGroup
        transitionName={'scale'}
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}>
        {messages}
      </CSSTransitionGroup>
    </div>
  );
}

ErrorsContainer.displayName = 'ErrorsContainer';
ErrorsContainer.propTypes = {
  errors: ImmutablePropTypes.orderedMapOf(React.PropTypes.string, React.PropTypes.string),
  onDismissError: React.PropTypes.func.isRequired,
};

export { ErrorsContainer };
