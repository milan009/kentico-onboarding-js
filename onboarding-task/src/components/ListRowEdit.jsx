import React, {
  PureComponent,
  PropTypes,
} from 'react';
import { validateItemText } from '../utils/itemValidator.ts';
import { Input } from './Input.jsx';

class ListRowEdit extends PureComponent {
  static displayName = 'ListRowEdit';
  static propTypes = {
    item: PropTypes.object.isRequired,
    onItemUpdate: PropTypes.func.isRequired,
    onItemDelete: PropTypes.func.isRequired,
    onItemCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.item.text,
      isSaveDisabled: false,
    };
  }

  _onTextChange = (value, isValid) => {
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
