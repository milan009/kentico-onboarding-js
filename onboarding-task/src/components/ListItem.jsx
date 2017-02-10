import React, { Component, PropTypes } from 'react';

class ListItem extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    delete: React.PropTypes.func,
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
          <span>{`${this.props.index + 1}. ${this.props.text}`}</span>
          <button type="button" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-default" onClick={this.stopEditing} >Cancel</button>
          <button type="button" className="btn btn-danger" onClick={() => this.props.delete(this.props.guid)}>Delete</button>
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
