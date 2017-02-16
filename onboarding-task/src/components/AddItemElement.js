import React, { Component } from 'react';

class AddItemElement extends Component {
  static displayName = 'AddItemElement';
  static propTypes = { onAdd: React.PropTypes.func.isRequired };

  constructor(props) {
    super(props);
    this.state = { inputValue: '' };

    this._handleChange = this._handleChange.bind(this);
    this._handleAdd = this._handleAdd.bind(this);
  }

  _handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  _handleAdd() {
    this.props.onAdd(this.state.inputValue);
    this.setState({ inputValue: '' });
  }

  render() {
    const value = this.state.inputValue;
    return (
      <div className="form-inline">
        <div className="form-group">
          <input className="form-control" value={value} onChange={this._handleChange} />
          <button className="btn btn-default" onClick={this._handleAdd}>Add</button>
        </div>
      </div>
    );
  }
}

export default AddItemElement;
