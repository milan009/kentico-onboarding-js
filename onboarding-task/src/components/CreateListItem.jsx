import React, { Component } from 'react';

class CreateListItem extends Component {

  static propTypes = {
    _onListItemAdd: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { input: '' };

    this._onInputChange = this._onInputChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onInputChange(event) {
    this.setState({ input: event.target.value });
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props._onListItemAdd(this.state.input);
    this.setState({ input: '' });
  }

  render() {
    return (
      <li className="list-group-item">
        <form className="form-inline" onSubmit={this._onSubmit} >
          <input type="text" className="form-control" value={this.state.input || ''} placeholder="Add item" onChange={this._onInputChange} />
          <button type="submit" className="btn btn-default" > Add </button>
        </form>
      </li>
    );
  }
}

export default CreateListItem;
