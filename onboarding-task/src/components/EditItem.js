import React, { Component, PropTypes } from 'react';

class EditItem extends Component {
  static displayName = 'EditItem';

  static propTypes = {
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired };

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

export default EditItem;
