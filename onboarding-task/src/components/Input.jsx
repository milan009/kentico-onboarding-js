import React, {
  PureComponent,
  PropTypes,
} from 'react';
import ReactTooltip from 'react-tooltip';
import { generateUuid } from '../utils/idGenerator.js';

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
    onValidityChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { errors: [] };

    // Unique id required by ReactTooltip to be bound by other element
    this.tooltipId = generateUuid();
  }

  _onChange = (event) => {
    this.props.onChange(event);
    const validation = this.props.validate(event.target.value);
    this.props.onValidityChange(validation.isValid);

    this.setState({ errors: validation.messages });
  };

  _getStyles = (hasErrors, isEmpty) => {
    const style = {
      groupClass: 'form-group has-feedback',
      glyphicon: 'form-control-feedback',
    };
    if (hasErrors) {
      style.groupClass += ' has-error';
      style.glyphicon += ' glyphicon glyphicon-remove';
    }
    if (isEmpty) {
      style.groupClass += ' has-success';
      style.glyphicon += ' glyphicon glyphicon-ok';
    }
    return style;
  };

  render() {
    const styles = this._getStyles(this.state.errors.length, this.props.value);

    return (
      <div className={styles.groupClass}>
        <input className="form-control" value={this.props.value} onChange={this._onChange} data-tip data-for={this.tooltipId} />
        <span className={styles.glyphicon} />
        <ErrorsTooltip inputId={this.tooltipId} errors={this.state.errors} />
      </div>
    );
  }
}

export { Input };
