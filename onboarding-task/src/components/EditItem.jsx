import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditItem extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    removeElement: PropTypes.func.isRequired,
    cancelChange: PropTypes.func.isRequired,
    saveChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
    };
  }

  _handleChange = (event) => {
    this.setState({ text: event.target.value });
  };

  _handleCancelClick = () => {
    this.props.cancelChange(this.props.uid);
  };

  _handleSaveClick = () => {
    this.props.saveChange(this.props.uid, this.state.text);
  };

  _handleRemoveClick = () => {
    this.props.removeElement(this.props.uid);
  };

  render() {
    return (
      <span>
        <input className="inp" type="text" value={this.state.text} onChange={this._handleChange} />
        <button
          className="btn btn-primary"
          onClick={this._handleSaveClick}
        >Save</button>
        <button className="btn btn-default" onClick={this._handleCancelClick}>Cancel</button>
        <button
          className="btn btn-danger"
          onClick={this._handleRemoveClick}
        >Delete</button>
      </span>
    );
  }
}

export { EditItem };
