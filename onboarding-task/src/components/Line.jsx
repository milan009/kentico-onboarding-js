import React, { Component } from 'react';
import LineText from './LineText.jsx';

const LinePropTypes = {
  number: React.PropTypes.number.isRequired,
  text: React.PropTypes.string.isRequired,
  onDelete: React.PropTypes.func,
};

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdited: false,
      text: this.props.text,
      prevText: this.props.text,
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleClickSave = this._handleClickSave.bind(this);
    this._handleClickCancel = this._handleClickCancel.bind(this);
    this._handleClickDelete = this._handleClickDelete.bind(this);
    this._handleDoubleClick = this._handleDoubleClick.bind(this);
  }
  _handleChange(event) {
    this.setState({ text: event.target.value });
  }
  _handleClickSave() {
    this.setState(
      {
        isEdited: false,
        prevText: this.state.text,
      }
    );
  }
  _handleClickCancel() {
    this.setState(
      {
        isEdited: false,
        text: this.state.prevText,
      }
    );
  }

  _handleClickDelete() {
    this.props.onDelete(this.state.index);
  }

  _handleDoubleClick() {
    this.setState(
      {
        isEdited: true,
      }
    );
  }

  render() {
    const isEdited = this.state.isEdited;
    const line = (
      <li className="list-group-item" onDoubleClick={this._handleDoubleClick} >
        <span>{this.props.number}. </span>
        <LineText isEdited={this.state.isEdited} text={this.state.text} onChange={this._handleChange} />
        {(isEdited && this.props.onDelete) ?
          <span>
            <button type="button" className="btn btn-primary" onClick={this._handleClickSave} >Save</button>
            <button type="button" className="btn btn-default" onClick={this._handleClickCancel} >Cancel</button>
            <button type="button" className="btn btn-danger" onClick={this._handleClickDelete}>Delete</button>
          </span> : null}
      </li>
    );

    return (
      line
    )
    ;
  }
}

Line.propTypes = LinePropTypes;

export default Line;
