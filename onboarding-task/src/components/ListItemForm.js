import React, { Component } from 'react';

class ListItemForm extends Component {
  static displayName = 'ListItemForm';
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired };

  render() {
    const value = this.props.value;
    return (
      <div className="form-inline">
        <div className="form-group">
          {this.props.index}.
          <input className="form-control" type="text" value={value} onChange={this.props.onChange} />
          <button className="btn btn-primary" onClick={this.props.onEdit}>Save</button>
          <button className="btn btn-default" onClick={this.props.onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={this.props.onDelete}>Delete</button>
        </div>
      </div>
    );
  }
}

export default ListItemForm;
