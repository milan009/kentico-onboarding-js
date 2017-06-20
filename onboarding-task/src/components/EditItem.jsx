import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditItem extends Component {

  static displayName = 'EditItem';

  static propTypes = {
    index: PropTypes.number,
    element: PropTypes.shape({
      text: PropTypes.string,
    }),
    onRemove: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: props.element.text,
    };
  }

  _textChange = event =>
    this.setState({ text: event.target.value });

  _saveClick = () =>
    this.props.onSave(this.state.text);

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
          onClick={this.props.onCancel}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger form-control"
          onClick={this.props.onRemove}
        >
          Delete
        </button>
      </div>
    );
  }
}

export { EditItem };
