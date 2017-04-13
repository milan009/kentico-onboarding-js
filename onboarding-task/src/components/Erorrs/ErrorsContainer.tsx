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

class ErrorsContainer extends React.PureComponent<IErrorsContainerProps, null> {
  static displayName = 'ErrorsContainer';

  static propTypes = {
    errors: ImmutablePropTypes.orderedMapOf(React.PropTypes.string, React.PropTypes.string),
    onDismissError: React.PropTypes.func.isRequired,
  };

  render() {
    const messages = this.props.errors.reduce((r: Array<HTMLElement>, v: string, k: string) =>
      [...r,
        (<ErrorMessage
          key={k}
          errorId={k}
          text={v}
          onDismissError={this.props.onDismissError} />)
      ], []);

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
}

export { ErrorsContainer };
