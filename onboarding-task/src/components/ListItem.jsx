import React, { Component, PropTypes } from 'react';

class ListItem extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    delete: React.PropTypes.func,
    guid: React.PropTypes.string.isRequired,
  };

  render() {
    return (
      <li className="list-group-item">
        <span>{this.props.text}</span>
        <button type="button" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-default">Cancel</button>
        <button type="button" className="btn btn-danger" onClick={() => this.props.delete(this.props.guid)}>Delete</button>
      </li>
    );
  }
}

export default ListItem;
