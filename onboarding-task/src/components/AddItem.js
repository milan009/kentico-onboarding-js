import React, { Component } from 'react';

class AddItem extends Component {
  static displayName = 'AddItem';

  static propTypes = { onAdd: React.PropTypes.func.isRequired };

  constructor(props) {
    super(props);
    this.state = { inputValue: '' };

    this._inputChange = this._inputChange.bind(this);
    this._addItem = this._addItem.bind(this);
  }

  _inputChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  _addItem() {
    this.props.onAdd(this.state.inputValue);
    this.setState({ inputValue: '' });
  }

  render() {
    const value = this.state.inputValue;
    return (
      <div className="form-inline">
        <div className="form-group">
          <input className="form-control" value={value} onChange={this._inputChange} />
          <button className="btn btn-default" onClick={this._addItem}>Add</button>
        </div>
      </div>
    );
  }
}

export default AddItem;
