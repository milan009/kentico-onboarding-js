import React, {
  PureComponent,
  PropTypes,
} from 'react';
import { validateItemText } from '../utils/itemValidator.js';

class CreateItem extends PureComponent {
  static displayName = 'CreateItem';
  static propTypes = {
    onItemAdd: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      error: '',
    };
  }

  _handleEditText = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    const text = this.state.text;

    const validation = validateItemText(text);
    if (validation.errors) {
      this.setState({
        error: validation.message,
      });
      return;
    }

    this.props.onItemAdd(text);
    this.setState({
      text: '',
      error: '',
    });
  };

  render() {
    return (
      <form onSubmit={this._handleSubmit} className="form-inline">
        <input type="text" className="form-control" value={this.state.text} onChange={this._handleEditText} />
        <button type="submit" className="btn btn-default"> Add</button>
        {this.state.error &&
          <div>
            <br />
            <span className="text-danger">{this.state.error}</span>
          </div>
        }

      </form>
    );
  }
}

export { CreateItem };
