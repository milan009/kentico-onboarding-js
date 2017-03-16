import React, {
  PureComponent,
  PropTypes,
} from 'react';
import { validateItemText } from '../utils/itemValidator.js';
import { Input } from './Input.jsx';

class ListRowEdit extends PureComponent {
  static displayName = 'ListRowEdit';
  static propTypes = {
    index: PropTypes.number.isRequired,
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

  _onTextChange = (event) => {
    this.setState({
      text: event.target.value,
      isSaveDisabled: false,
    });
  };

  _onItemUpdate = (event) => {
    event.preventDefault();
    this.props.onItemUpdate(this.props.item.id, this.state.text);
  };

  _onItemDelete = (event) => {
    event.preventDefault();
    this.props.onItemDelete(this.props.item.id);
  };

  _onItemCancel = (event) => {
    event.preventDefault();
    this.props.onItemCancel(this.props.item.id);
  };

  _onInvalid = (event) => {
    this.setState({
      text: event.target.value,
      isSaveDisabled: true,
    });
  };

  render() {
    return (
      <div className="form-inline">
        <span>{this.props.index}. </span>
        <Input value={this.state.text} onChange={this._onTextChange} validate={validateItemText} onInvalid={this._onInvalid} />
        <button type="button" className="btn btn-primary" onClick={this._onItemUpdate} disabled={this.state.isSaveDisabled}>Save</button>
        <button type="button" className="btn btn-default" onClick={this._onItemCancel}>Cancel</button>
        <button type="button" className="btn btn-danger" onClick={this._onItemDelete}>Delete</button>
      </div>
    );
  }
}

export { ListRowEdit };
