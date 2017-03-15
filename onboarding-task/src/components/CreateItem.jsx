import React, { PureComponent, PropTypes } from 'react';

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
    if (!text.match(/\S/)) {
      this.setState({
        error: 'Enter non-empty value!',
      });
      return;
    }
    this.props.onItemAdd(text);
    this.setState({
      text: '',
    });
  };

  render() {
    return (
      <form onSubmit={this._handleSubmit} className="form-inline">
        <input type="text" className="form-control" value={this.state.text} onChange={this._handleEditText} />
        <button type="submit" className="btn btn-default"> Add</button>
        <br />
        <span className="text-danger">{this.state.error}</span>
      </form>
    );
  }
}

export { CreateItem };
