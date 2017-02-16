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

    this._handleClick = this._handleClick.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
    this._handleSave = this._handleSave.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
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
    this.props.onEdit({ id: this.props.id, value: this.state.tempValue });
    this.setState({ isEditable: false });
  }

  _handleDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    const value = this.state.tempValue;
    if (this.state.isEditable) {
      return (
        <div className="form-inline">
          <div className="form-group">
            {this.props.index}.
            <input className="form-control" type="text" value={value} onChange={this._handleChange} />
            <button className="btn btn-primary" onClick={this._handleSave}>Save</button>
            <button className="btn btn-default" onClick={this._handleCancel}>Cancel</button>
            <button className="btn btn-danger" onClick={this._handleDelete}>Delete</button>
          </div>
        </div>
      );
    }
    return (
      <div onClick={this._handleClick}>
        {this.props.index}.{value}
      </div>
    );
  }
}

export default ListItem;
