import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class EditItem extends PureComponent {

  static displayName = 'EditItem';

  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: props.item.text,
    };
  }

  _textChange = event =>
    this.setState({ text: event.target.value });

  _saveClick = () =>
    this.props.onSave(this.props.item.id, this.state.text);

  _cancelClick = () =>
    this.props.onCancel(this.props.item.id);

  _deleteClick = () =>
    this.props.onDelete(this.props.item.id);

  render() {
    return (
      <div className="form-inline">
        <span>{this.props.index}. </span>
        <input
          className="form-control"
          type="text"
          value={this.state.text}
          onChange={this._textChange}
        />
        <button
          className="btn btn-primary form-control"
          onClick={this._saveClick}
        >
          Save
        </button>
        <button
          className="btn btn-default form-control"
          onClick={this._cancelClick}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger form-control"
          onClick={this._deleteClick}
        >
          Delete
        </button>
      </div>
    );
  }
}

export { EditItem as EditItemComponent };
