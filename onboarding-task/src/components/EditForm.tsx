import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import {IViewItem} from '../viewModels/ViewItem';

interface IEditFormProps {
  item: IViewItem;
  onSave: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onCancel: (id: string) => void;
}

interface IEditFormState {
  editInput: string;
}

class EditForm extends React.PureComponent<IEditFormProps, IEditFormState> {
  static displayName = 'EditForm';

  static propTypes = {
    item: ImmutablePropTypes.recordOf({
      id: React.PropTypes.string,
      text: React.PropTypes.string,
      index: React.PropTypes.number,
    }).isRequired,
    onSave: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  };

  constructor(props: IEditFormProps) {
    super(props);
    this.state = {
      editInput: props.item.text,
    };
    this._handleEditInputChange = this._handleEditInputChange.bind(this);
    this._save = this._save.bind(this);
    this._delete = this._delete.bind(this);
    this._cancel = this._cancel.bind(this);
  }

  _handleEditInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ editInput: event.target.value });
  }

  _save() {
    this.props.onSave(this.props.item.id, this.state.editInput);
  }

  _cancel() {
    this.props.onCancel(this.props.item.id);
  }

  _delete() {
    this.props.onDelete(this.props.item.id);
  }

  render() {
    return (
      <form className="form-inline">
        <label>{`${this.props.item.index}. `}</label>
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
