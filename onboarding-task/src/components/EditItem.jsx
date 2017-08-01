import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { isStringValid } from '../utils/validation';

class EditItem extends PureComponent {

  static displayName = 'EditItem';

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
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

  _textChange = (event) =>
    this.setState({ text: event.target.value });

  _saveChange = () => {
    const editedText = this.state.text;
    if (isStringValid(editedText)) {
      this.props.onSave(editedText);
    }
  };

  _keyUp = (event) => {
    switch (event.key) {
      case 'Enter':
        this._saveChange();
        break;
      case 'Escape':
        this.props.onCancel();
        break;
      default:
        break;
    }
  };

  render() {
    const editedText = this.state.text;
    return (
      <div className="form-inline">
        <span>{this.props.item.index}. </span>
        <input
          autoFocus={true}
          className="form-control"
          type="text"
          value={editedText}
          onChange={this._textChange}
          onKeyUp={this._keyUp}
        />
        <button
          className={classNames('btn', 'btn-primary', 'form-control', { disabled: !isStringValid(editedText) })}
          onClick={this._saveChange}
        >
          Save
        </button>
        <button
          className="btn btn-default form-control"
          onClick={this.props.onCancel}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger form-control"
          onClick={this.props.onDelete}
        >
          Delete
        </button>
      </div>
    );
  }
}

export { EditItem };
