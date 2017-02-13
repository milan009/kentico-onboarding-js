import React, { Component, PropTypes } from 'react';

class ListItem extends Component {

  static displayName = 'ListItem';

  static propTypes = {
    text: PropTypes.string.isRequired,
    delete: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
    this._startEditing = this._startEditing.bind(this);
    this._stopEditing = this._stopEditing.bind(this);
    this._onSaveClick = this._onSaveClick.bind(this);
  }

  _startEditing() {
    this.setState({
      edit: true,
    });
  }

  _stopEditing() {
    this.setState({
      edit: false,
    });
  }

  _onSaveClick() {
    this.props.save(this.props.id, this.editInput.value);
    this._stopEditing();
  }

  render() {
    if (this.state.edit) {
      return (
        <li className="list-group-item">
          <form className="form-inline">
            <label>{`${this.props.index + 1}. `}</label>
            <input
              type="text"
              className="form-control"
              defaultValue={this.props.text} ref={(input) => {
                this.editInput = input;
              }}
            />
            <button type="button" className="btn btn-primary" onClick={this._onSaveClick}>Save</button>
            <button type="button" className="btn btn-default" onClick={this._stopEditing} >Cancel</button>
            <button type="button" className="btn btn-danger" onClick={() => this.props.delete(this.props.id)}>Delete</button>
          </form>
        </li>
      );
    }
    return (
      <li className="list-group-item" onClick={this._startEditing} >
        <span>{`${this.props.index + 1}. ${this.props.text}`}</span>
      </li>
    );
  }
}

export default ListItem;
