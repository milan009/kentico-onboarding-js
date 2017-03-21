import React, { Component, PropTypes } from 'react';

class LineEdit extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  static displayName = 'LineEdit';

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
    };
  }

  _handleOnChange = (event) => {
    this.setState({ text: event.target.value });
  };

  _handleOnSave = () => {
    this.props.onSave({
      id: this.props.id,
      text: this.state.text,
    });
  };

  _handleOnDelete = () => {
    this.props.onDelete(this.props.id);
  };

  _handleOnCancel = () => {
    this.props.onCancel(this.props.id);
  };

  render() {
    return (
      <li className="list-group-item">
        <span className="form-inline">{this.props.number}.
          <input className="form-control" value={this.state.text} onChange={this._handleOnChange} />
          <span>
            <button type="button" className="btn btn-primary" onClick={this._handleOnSave}>Save</button>
            <button type="button" className="btn btn-default" onClick={this._handleOnCancel}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={this._handleOnDelete}>Delete</button>
          </span>
        </span>
      </li>
    );
  }
}

export { LineEdit };
