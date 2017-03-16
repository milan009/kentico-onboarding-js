import React, {
  PureComponent,
  PropTypes,
} from 'react';
import ReactTooltip from 'react-tooltip';
import { generateUuid } from '../utils/idGenerator.js';

function ErrorsTooltip(props) {
  if (!props.errors.length) {
    return null;
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
    onInvalid: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  _onChange = (event) => {
    this.props.onChange(event);
    const validation = this.props.validate(event.target.value);
    const errors = validation.isValid ? [] : validation.messages;
    this.props.onInvalid(validation.isValid);

    this.setState({ errors });
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
    // ReactTooltip needs to be bound to unique value
    const id = generateUuid();

    const styles = this._getStyles(this.state.errors.length, this.props.value);

    return (
      <div className={styles.groupClass}>
        <input className="form-control" value={this.props.value} onChange={this._onChange} data-tip data-for={id} />
        <span className={styles.glyphicon} />
        <ErrorsTooltip inputId={id} errors={this.state.errors} />
      </div>
    );
  }
}

export { Input };
