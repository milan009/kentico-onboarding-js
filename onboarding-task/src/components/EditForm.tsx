import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import { IViewItem } from '../viewModels/ViewItem';

interface IEditFormProps {
  item: IViewItem;
  onSave: (text: string) => void;
  onDelete: () => void;
  onCancel: () => void;
}

interface IEditFormState {
  editInput: string;
}

class EditForm extends React.PureComponent<IEditFormProps, IEditFormState> {
  static displayName = 'EditForm';

  static propTypes = {
    item: ImmutablePropTypes.recordOf({
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
  }

  _handleEditInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ editInput: event.target.value });
  }

  _save() {
    this.props.onSave(this.state.editInput);
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
        <button type="button" className="btn btn-default" onClick={this.props.onCancel} >Cancel</button>
        <button type="button" className="btn btn-danger" onClick={this.props.onDelete}>Delete</button>
      </form>
    );
  }
}

export { EditForm };
