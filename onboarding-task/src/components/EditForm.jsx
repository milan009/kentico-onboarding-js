import React, { PureComponent, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class EditForm extends PureComponent {
  static displayName = 'EditForm';

  static propTypes = {
    item: ImmutablePropTypes.recordOf({
      id: PropTypes.string,
      text: PropTypes.string,
    }).isRequired,
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
    this._cancel = this._cancel.bind(this);
  }

  _handleEditInputChange(event) {
    this.setState({ editInput: event.target.value });
  }

  _save() {
    this.props.onSave(this.props.item.id, this.state.editInput);
    this.props.onCancel(this.props.item.id);
  }

  _cancel() {
    this.props.onCancel(this.props.item.id);
  }

  _delete() {
    this.props.onDelete(this.props.item.id);
    this.props.onCancel(this.props.item.id);
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
        <button type="button" className="btn btn-default" onClick={this._cancel} >Cancel</button>
        <button type="button" className="btn btn-danger" onClick={this._delete}>Delete</button>
      </form>
    );
  }
}

export { EditForm };
