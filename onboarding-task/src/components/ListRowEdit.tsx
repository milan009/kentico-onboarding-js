import * as React from 'react';
import { validateItemText } from '../utils/itemValidator';
import { Input } from './Input';
import { IItemViewModel } from '../interfaces/IItemViewModel';

interface IListRowEditProps {
  item: IItemViewModel;
  onItemUpdate: (text: string) => void;
  onItemDelete: () => void;
  onItemCancel: () => void;
}

interface IListRowEditState {
  text: string;
  isSaveDisabled: boolean;
}

class ListRowEdit extends React.PureComponent<IListRowEditProps, IListRowEditState> {
  static displayName = 'ListRowEdit';
  static propTypes = {
    item: React.PropTypes.object.isRequired,
    onItemUpdate: React.PropTypes.func.isRequired,
    onItemDelete: React.PropTypes.func.isRequired,
    onItemCancel: React.PropTypes.func.isRequired,
  };

  constructor(props: IListRowEditProps) {
    super(props);
    this.state = {
      text: this.props.item.text,
      isSaveDisabled: false,
    };
  }

  _onTextChange = (value: string, isValid: boolean) => {
    this.setState({
      text: value,
      isSaveDisabled: !isValid,
    });
  };

  _onItemUpdate = () => this.props.onItemUpdate(this.state.text);

  render() {
    return (
      <div className="form-inline">
        <span>{this.props.item.index}. </span>
        <Input value={this.state.text} onChange={this._onTextChange} validate={validateItemText} />
        <button type="button" className="btn btn-primary" onClick={this._onItemUpdate} disabled={this.state.isSaveDisabled}>Save</button>
        <button type="button" className="btn btn-default" onClick={this.props.onItemCancel}>Cancel</button>
        <button type="button" className="btn btn-danger" onClick={this.props.onItemDelete}>Delete</button>
      </div>
    );
  }
}

export { ListRowEdit };
