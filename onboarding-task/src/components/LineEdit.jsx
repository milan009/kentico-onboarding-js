import React, { Component } from 'react';

const LineTextPropTypes = {
  id: React.PropTypes.string.isRequired,
  number: React.PropTypes.number.isRequired,
  text: React.PropTypes.string.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};


class LineEdit extends Component {
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
    this.props.onSave({ id: this.props.id, text: this.state.text });
  };

  _handleOnDelete = () => {
    this.props.onDelete(this.props.id);
  };

  _handleOnCancel = () => {
    this.props.onCancel(this.props.id);
  };

  render() {
    return (
      <li>
        <span>{this.props.number}. </span>
        <input className="" value={this.state.text} onChange={this._handleOnChange} />
        <span>
          <button type="button" className="btn btn-primary" onClick={this._handleOnSave}>Save</button>
          <button type="button" className="btn btn-default" onClick={this._handleOnCancel}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={this._handleOnDelete}>Delete</button>
        </span>
      </li>
    );
  }
}

LineEdit.propTypes = LineTextPropTypes;

export default LineEdit;
