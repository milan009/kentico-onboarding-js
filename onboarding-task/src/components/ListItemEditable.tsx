import * as React from 'react';
import { IItemView } from '../models/IItemView';
import { IAction } from '../actions/IAction';

interface IListItemEditableState {
  text: string;
}

interface IListItemEditableProps {
  item: IItemView;
  index: number;
  onUpdateText: (text: string) => IAction;
  onToggleEditMode: () => IAction;
  onDelete: () => IAction;
}

class ListItemEditable extends React.PureComponent<IListItemEditableProps, IListItemEditableState> {
  static displayName = 'ListItemEditable';
  static propTypes = {
    item: React.PropTypes.shape({
      guid: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
    }),
    index: React.PropTypes.number.isRequired,
    onUpdateText: React.PropTypes.func.isRequired,
    onToggleEditMode: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  };

  constructor(props: IListItemEditableProps) {
    super(props);
    this.state = { text: props.item.text };

    this._onUpdate = this._onUpdate.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
  }

  _onUpdate() {
    this.props.onUpdateText(this.state.text);
  }

  _onInputChange(e: React.SyntheticEvent<HTMLInputElement>) {
    this.setState({ text: e.currentTarget.value });
  }

  render() {
    return (
      <tr>
        <td>
          <div className="form-inline">
            <div className="form-group">
              {this.props.index}. <input className="form-control" type="text" value={this.state.text} onChange={this._onInputChange} />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" onClick={this._onUpdate}>Save</button>
              <button className="btn btn-default" onClick={this.props.onToggleEditMode}>Cancel</button>
              <button className="btn btn-danger" onClick={this.props.onDelete}>Delete</button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export { ListItemEditable };
