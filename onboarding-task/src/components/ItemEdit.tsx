import * as React from 'react';
import { IItemViewModel } from '../interfaces/IItemViewModel';
import { IAction } from '../interfaces/IAction';

interface IItemEditDataProps {
  item: IItemViewModel;
}

interface IItemEditCallbackProps {
  onSave: (text: string) => IAction;
  onCancel: () => IAction;
  onDelete: () => IAction;
}

interface IItemEditState {
  text: string;
}


class ItemEdit extends React.PureComponent<IItemEditDataProps & IItemEditCallbackProps, IItemEditState> {
  static displayName = 'ItemEdit';

  static propTypes = {
    item: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      isEdited: React.PropTypes.bool.isRequired,
      index: React.PropTypes.number.isRequired,
    }).isRequired,
    onSave: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  };

  constructor(props: IItemEditDataProps & IItemEditCallbackProps) {
    super(props);
    this.state = {
      text: this.props.item.text,
    };
  }

  _handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ text: event.currentTarget.value });
  };

  _handleOnSave = () => {
    this.props.onSave(
      this.state.text,
    );
  };

  render() {
    return (
      <div>
        <span className="form-inline">{this.props.item.index}.
          <input className="form-control" value={this.state.text} onChange={this._handleOnChange} />
          <span>
            <button type="button" className="btn btn-primary" onClick={this._handleOnSave}>Save</button>
            <button type="button" className="btn btn-default" onClick={this.props.onCancel}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={this.props.onDelete}>Delete</button>
          </span>
        </span>
      </div>
    );
  }
}

export { ItemEdit };
