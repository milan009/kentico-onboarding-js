import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import { ErrorMessage } from './ErrorMessage';
const CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');
import './errorsContainer.css';

class ErrorsContainer extends React.PureComponent<any, any> {
  static displayName = 'ErrorsContainer';

  static propTypes = {
    errors: ImmutablePropTypes.orderedMapOf(React.PropTypes.string, React.PropTypes.string),
    onDismissError: React.PropTypes.func.isRequired,
  };

  render() {
    const messages = this.props.errors.reduce((r: Array<HTMLElement>, v: string, k: string) => {
      const msg = <ErrorMessage key={k} errorId={k} text={v} onDismissError={this.props.onDismissError} />;
      return [...r, msg];
    }, []);

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
