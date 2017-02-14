import React, { Component, PropTypes } from 'react';

class EditForm extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editInput: props.item.text,
    };
    this._handleEditInputChange = this._handleEditInputChange.bind(this);
    this._save = this._save.bind(this);
    this._delete = this._delete.bind(this);
  }

  _handleEditInputChange(event) {
    this.setState({ editInput: event.target.value });
  }

  _save() {
    this.props.onSave(this.props.item.id, this.state.editInput);
    this.props.onCancel();
  }

  _delete() {
    this.props.onDelete(this.props.item.id);
  }

  render() {
    return (
      <form className="form-inline">
        <label>{`${this.props.index + 1}. `}</label>
        <input
          type="text"
          className="form-control"
          value={this.state.editInput}
          onChange={this._handleEditInputChange}
        />
        <button type="button" className="btn btn-primary" onClick={this._save}>Save</button>
        <button type="button" className="btn btn-default" onClick={this.props.onCancel} >Cancel</button>
        <button type="button" className="btn btn-danger" onClick={this._delete}>Delete</button>
      </form>
    );
  }
}

export default EditForm;
