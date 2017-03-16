import React, {
  PureComponent,
  PropTypes,
} from 'react';
import { validateItemText } from '../utils/itemValidator.js';
import { Input } from './Input.jsx';

class CreateItem extends PureComponent {
  static displayName = 'CreateItem';
  static propTypes = {
    onItemAdd: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isAddDisabled: true,
    };
  }

  _onTextChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    const text = this.state.text;
    this.props.onItemAdd(text);

    this.setState({
      text: '',
    });
  };

  _onValidityChange = (isValid) => {
    this.setState({
      isAddDisabled: !isValid,
    });
  };

  render() {
    return (
      <form onSubmit={this._handleSubmit} className="form-inline">
        <Input value={this.state.text} onChange={this._onTextChange} validate={validateItemText} onInvalid={this._onValidityChange} />
        <button type="submit" className="btn btn-default" disabled={this.state.isAddDisabled}>Add</button>
      </form>
    );
  }
}

export { CreateItem };
