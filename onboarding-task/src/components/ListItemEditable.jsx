import React, { Component, PropTypes } from 'react';

class ListItemEditable extends Component {
  static displayName = 'ListItemEditable';
  static propTypes = {
    item: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleClick() {
    this.props.handleClick(this.props.item);
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
      <tr>
        <td>
          <div className="form-inline">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                defaultValue={this.props.item.text}
                ref={
                  (input) => {
                    this.textInput = input;
                  }
                }
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" onClick={this._handleChange}>Save</button>
              <button className="btn btn-default" onClick={this._handleClick}>Cancel</button>
              <button className="btn btn-danger" onClick={this._handleDelete}>Delete</button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default ListItemEditable;
