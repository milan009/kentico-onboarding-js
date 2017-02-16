import React, { Component } from 'react';

class ListItem extends Component {
  static displayName = 'ListItem';
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    index: React.PropTypes.string.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired };

  constructor(props) {
    super(props);

    this.state = { tempValue: this.props.value, isEditable: false };

    this._labelClick = this._labelClick.bind(this);
    this._inputChange = this._inputChange.bind(this);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._saveValue = this._saveValue.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
  }

  _labelClick() {
    this.setState({ isEditable: true });
  }

  _inputChange(event) {
    this.setState({ tempValue: event.target.value });
  }

  _cancelEdit() {
    this.setState(() => ({ tempValue: this.props.value, isEditable: false }));
  }

  _saveValue() {
    this.props.onEdit({ id: this.props.id, value: this.state.tempValue });
    this.setState({ isEditable: false });
  }

  _deleteItem() {
    this.props.onDelete(this.props.id);
  }

  render() {
    const value = this.state.tempValue;
    if (this.state.isEditable) {
      return (
        <div className="form-inline">
          <div className="form-group">
            {this.props.index}.
            <input className="form-control" type="text" value={value} onChange={this._inputChange} />
            <button className="btn btn-primary" onClick={this._saveValue}>Save</button>
            <button className="btn btn-default" onClick={this._cancelEdit}>Cancel</button>
            <button className="btn btn-danger" onClick={this._deleteItem}>Delete</button>
          </div>
        </div>
      );
    }
    return (
      <div onClick={this._labelClick}>
        {this.props.index}.{value}
      </div>
    );
  }
}

export default ListItem;
