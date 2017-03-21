import React, { Component, PropTypes } from 'react';

class AddLine extends Component {
  static propTypes = {
    text: PropTypes.string,
    onAdd: PropTypes.func.isRequired,
  };

  static displayName = 'AddLine';

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  _handleChange = (event) => {
    this.setState({ text: event.target.value });
  };

  _handleClickAdd = () => {
    this.props.onAdd(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    return (
      <li className="list-group-item form-inline">
        <input className="form-control" onChange={this._handleChange} value={this.state.text} />
        <button type="button" className="btn btn-default" onClick={this._handleClickAdd}>Add</button>
      </li>
    );
  }
}

export { AddLine };
