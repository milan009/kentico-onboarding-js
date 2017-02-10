import React, { Component, PropTypes } from 'react';

class ListItem extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    delete: React.PropTypes.func.isRequired,
    save: React.PropTypes.func.isRequired,
    guid: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
    this.startEditing = this.startEditing.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
  }

  onSaveClick() {
    this.props.save(this.props.guid, this.editInput.value);
    this.stopEditing();
  }

  startEditing() {
    this.setState({
      edit: true,
    });
  }

  stopEditing() {
    this.setState({
      edit: false,
    });
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
            <button type="button" className="btn btn-primary" onClick={this.onSaveClick}>Save</button>
            <button type="button" className="btn btn-default" onClick={this.stopEditing} >Cancel</button>
            <button type="button" className="btn btn-danger" onClick={() => this.props.delete(this.props.guid)}>Delete</button>
          </form>
        </li>
      );
    }
    return (
      <li className="list-group-item" onClick={this.startEditing} >
        <span>{`${this.props.index + 1}. ${this.props.text}`}</span>
      </li>
    );
  }
}

export default ListItem;
