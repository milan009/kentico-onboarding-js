import * as React from 'react';
import { StatelessComponent, PropTypes } from 'react';
import * as classNames from 'classnames';
import { List } from 'immutable';

// No types included or available
const ReactTooltip = require('react-tooltip');
const ImmutablePropTypes = require('react-immutable-proptypes');

import { generateUuid } from '../utils/idGenerator';
import { IError } from '../interfaces/IError';

interface IErrorsTooltipProps {
  inputId: string;
  errors: List<string>;
}

const ErrorsTooltip: StatelessComponent<IErrorsTooltipProps> = (props) => {
  if (!props.errors.size) {
    return <noscript />;
  }

  const errors = props
    .errors
    .map(message => (
      <li key={message}>{message}</li>
    ));

  return (
    <ReactTooltip id={props.inputId} type="error" effect="solid" place="right">
      <ul className="list-unstyled-custom">
        {errors}
      </ul>
    </ReactTooltip>
  );
};

ErrorsTooltip.displayName = 'ErrorsTooltip';
ErrorsTooltip.propTypes = {
  inputId: PropTypes.string.isRequired,
  errors: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
};


interface IInputProps {
  value: string;
  onChange: (text: string, isValid: boolean) => void;
  validate: (text: string) => IError;
}

interface IInputState {
  errors: List<string>;
}

class Input extends React.PureComponent<IInputProps, IInputState> {
  static displayName = 'Input';
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
  };

  private tooltipId: string;

  constructor(props: IInputProps) {
    super(props);
    this.state = { errors: List<string>() };

    // Unique id required by ReactTooltip to be bound by other element
    this.tooltipId = generateUuid();
  }

  _onChange = (event: any) => {
    const validation = this.props.validate(event.target.value);
    this.props.onChange(event.target.value, validation.isValid);

    this.setState({ errors: List(validation.messages) });
  };

  _getStyles = (hasErrors: boolean, isEmpty: boolean) => {
    const groupStyle = classNames('form-group', 'has-feedback', {
      'has-error': hasErrors,
      'has-success': !hasErrors && !isEmpty,
    });

    const glyphiconStyle = classNames('form-control-feedback', {
      'glyphicon glyphicon-remove': hasErrors,
      'glyphicon glyphicon-ok': !hasErrors && !isEmpty,
    });
    return {
      groupStyle,
      glyphiconStyle,
    };
  };

  render() {
    const styles = this._getStyles(this.state.errors.size > 0, !this.props.value);

    return (
      <div className={styles.groupStyle}>
        <input className="form-control" value={this.props.value} onChange={this._onChange} data-tip data-for={this.tooltipId} />
        <span className={styles.glyphiconStyle} />
        <ErrorsTooltip inputId={this.tooltipId} errors={this.state.errors} />
      </div>
    );
  }
}

export { Input };
