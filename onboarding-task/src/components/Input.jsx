import React, {
  PureComponent,
  PropTypes,
} from 'react';
import ReactTooltip from 'react-tooltip';
import { generateUuid } from '../utils/idGenerator.js';
import classNames from 'classnames';

function ErrorsTooltip(props) {
  if (!props.errors.length) {
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
}

ErrorsTooltip.propTypes = {
  inputId: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

class Input extends PureComponent {
  static displayName = 'Input';
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { errors: [] };

    // Unique id required by ReactTooltip to be bound by other element
    this.tooltipId = generateUuid();
  }

  _onChange = (event) => {
    const validation = this.props.validate(event.target.value);
    this.props.onChange(event.target.value, validation.isValid);

    this.setState({ errors: validation.messages });
  };

  _getStyles = (hasErrors, isEmpty) => {
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
    const styles = this._getStyles(this.state.errors.length, !this.props.value);

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
