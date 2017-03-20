import React, { Component } from 'react';

const AddLinePropTypes = {
  text: React.PropTypes.string,
  onAdd: React.PropTypes.func.isRequired,
};

class AddLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleClickAdd = this._handleClickAdd.bind(this);
  }

  _handleChange(event) {
    this.setState({ text: event.target.value });
  }

  _handleClickAdd() {
    this.props.onAdd(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <li className="list-group-item">
        <input onChange={this._handleChange} value={this.state.text} />
        <button type="button" className="btn btn-default" onClick={this._handleClickAdd}>Add</button>
      </li>
    );
  }
}

AddLine.propTypes = AddLinePropTypes;

export default AddLine;
