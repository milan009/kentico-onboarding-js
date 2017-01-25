import React, { Component, PropTypes } from 'react';

class ListItemEditable extends Component {
  static displayName = 'ListItemEditable';
  static propTypes = {
    key: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = props.item;
    this._handleClick = this._handleClick.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleClick() {
    this.props.handleClick(this.state);
  }

  _handleChange() {
    const editedItem = { text: this.textInput.value, editable: false, guid: this.props.item.guid };
    this.props.handleUpdate(editedItem);
  }

  _handleDelete() {
    this.props.handleDelete(this.props.item.guid);
  }

  render() {
    return (
      <div className="form-inline">
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            defaultValue={this.state.text}
            ref={
              (input) => {
                this.textInput = input;
              }
            }
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={this._handleChange}>Save</button>
          <button className="btn btn-default" onClick={this._handleDelete}>Delete</button>
          <button className="btn btn-danger" onClick={this._handleClick}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default ListItemEditable;
