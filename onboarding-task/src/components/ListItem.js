import React, { Component } from 'react';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { tempValue: this.props.value, isEditable: false };

    this._handleClick = this._handleClick.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
    this._handleSave = this._handleSave.bind(this);
  }

  _handleClick() {
    this.setState({ isEditable: true });
  }

  _handleChange(event) {
    this.setState({ tempValue: event.target.value });
  }

  _handleCancel() {
    this.setState(() => ({ tempValue: this.props.value, isEditable: false }));
  }

  _handleSave() {
    this.props.edit({ id: this.props.id, value: this.state.tempValue });
    this.setState({ isEditable: false });
  }

  render() {
    const value = this.state.tempValue;
    if (this.state.isEditable) {
      return (
        <li>
          <label>
            <input type="text" value={value} onChange={this._handleChange} />
          </label>
          <button onClick={this._handleSave}>Save</button>
          <button onClick={this._handleCancel}>Cancel</button>
        </li>
      );
    }
    return (
      <li onClick={this._handleClick}>
        {value}
      </li>
    );
  }
}
ListItem.propTypes = { id: React.PropTypes.string.isRequired, value: React.PropTypes.string.isRequired, edit: React.PropTypes.func.isRequired };

export default ListItem;
